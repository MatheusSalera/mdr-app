import * as SQLite from 'expo-sqlite';

let dbPromise = null;

export function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync('mdr.db');
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS propostas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          protocolo TEXT NOT NULL DEFAULT '',
          nome TEXT NOT NULL,
          condominio TEXT NOT NULL,
          telefone TEXT NOT NULL,
          unidades INTEGER,
          servico TEXT NOT NULL,
          mensagem TEXT,
          status TEXT NOT NULL DEFAULT 'Recebida',
          criadoEm TEXT NOT NULL,
          atualizadoEm TEXT NOT NULL
        );`);
      return db;
    })();
  }
  return dbPromise;
}

const agora = () => new Date().toISOString();
const numero = (v) => (v ? parseInt(v, 10) || null : null);

export async function criarProposta(p) {
  const db = await getDb();
  const r = await db.runAsync(
    `INSERT INTO propostas (nome, condominio, telefone, unidades, servico, mensagem, status, criadoEm, atualizadoEm)
     VALUES (?, ?, ?, ?, ?, ?, 'Recebida', ?, ?)`,
    [p.nome.trim(), p.condominio.trim(), p.telefone, numero(p.unidades), p.servico, (p.mensagem || '').trim(), agora(), agora()]
  );
  const protocolo = `MDR-${new Date().getFullYear()}-${String(r.lastInsertRowId).padStart(4, '0')}`;
  await db.runAsync('UPDATE propostas SET protocolo = ? WHERE id = ?', [protocolo, r.lastInsertRowId]);
  return protocolo;
}


export async function listarPropostas({ busca = '', status = 'Todas' } = {}) {
  const db = await getDb();
  let sql = 'SELECT * FROM propostas WHERE 1=1';
  const args = [];
  if (status !== 'Todas') { sql += ' AND status = ?'; args.push(status); }
  if (busca.trim()) {
    sql += ' AND (nome LIKE ? OR condominio LIKE ? OR protocolo LIKE ?)';
    const q = `%${busca.trim()}%`;
    args.push(q, q, q);
  }
  return db.getAllAsync(`${sql} ORDER BY id DESC`, args);
}

export async function obterProposta(id) {
  const db = await getDb();
  return db.getFirstAsync('SELECT * FROM propostas WHERE id = ?', [id]);
}

export async function atualizarProposta(id, p) {
  const db = await getDb();
  await db.runAsync(
    `UPDATE propostas SET nome=?, condominio=?, telefone=?, unidades=?, servico=?, mensagem=?, status=?, atualizadoEm=? WHERE id=?`,
    [p.nome.trim(), p.condominio.trim(), p.telefone, numero(p.unidades), p.servico, (p.mensagem || '').trim(), p.status, agora(), id]
  );
}

export async function removerProposta(id) {
  const db = await getDb();
  await db.runAsync('DELETE FROM propostas WHERE id = ?', [id]);
}

export async function existeDuplicada(p) {
  const db = await getDb();
  const r = await db.getFirstAsync(
    `SELECT id FROM propostas WHERE telefone = ? AND servico = ? AND lower(condominio) = lower(?) AND status != 'Cancelada'`,
    [p.telefone, p.servico, p.condominio.trim()]
  );
  return !!r;
}


export async function contarPorStatus() {
  const db = await getDb();
  const linhas = await db.getAllAsync('SELECT status, COUNT(*) AS n FROM propostas GROUP BY status');
  const out = { total: 0 };
  linhas.forEach((l) => { out[l.status] = l.n; out.total += l.n; });
  return out;
}
