CREATE TABLE IF NOT EXISTS t_p72692264_neptune_design.leads (
  id SERIAL PRIMARY KEY,
  project TEXT NOT NULL DEFAULT '5628',
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  contact_way TEXT DEFAULT 'Телефон',
  comment TEXT DEFAULT '',
  estimate TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);