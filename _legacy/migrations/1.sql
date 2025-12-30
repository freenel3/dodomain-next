
CREATE TABLE domains (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  extension TEXT NOT NULL,
  description TEXT,
  registered_year TEXT,
  traffic TEXT,
  registration_date DATE,
  first_registration_date DATE,
  listed_date DATE,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_domains_extension ON domains(extension);
CREATE INDEX idx_domains_price ON domains(price);
CREATE INDEX idx_domains_category ON domains(category);
CREATE INDEX idx_domains_is_active ON domains(is_active);
