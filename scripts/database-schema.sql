-- Zakat Calculator Database Schema
-- Supports ASEAN countries with multi-currency zakat calculations

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    preferred_currency VARCHAR(3) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Nisab values table (updated monthly based on gold prices)
CREATE TABLE nisab_values (
    id SERIAL PRIMARY KEY,
    currency VARCHAR(3) NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    gold_price_per_gram DECIMAL(10,2) NOT NULL,
    effective_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(currency, effective_date)
);

-- Zakat calculations table
CREATE TABLE zakat_calculations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    session_id VARCHAR(255), -- For anonymous users
    country_code VARCHAR(3) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    crypto_assets DECIMAL(15,2) NOT NULL,
    debts DECIMAL(15,2) DEFAULT 0,
    net_assets DECIMAL(15,2) NOT NULL,
    nisab_threshold DECIMAL(15,2) NOT NULL,
    nisab_status VARCHAR(10) NOT NULL CHECK (nisab_status IN ('above', 'below')),
    zakat_amount DECIMAL(15,2) NOT NULL,
    zakat_tokens DECIMAL(15,2) NOT NULL,
    calculation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Zakat payments table
CREATE TABLE zakat_payments (
    id SERIAL PRIMARY KEY,
    payment_id VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id),
    calculation_id INTEGER REFERENCES zakat_calculations(id),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    charity_id VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_hash VARCHAR(255),
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completion_date TIMESTAMP,
    certificate_url VARCHAR(500),
    blockchain_network VARCHAR(50),
    gas_fee DECIMAL(15,8)
);

-- Charity organizations table
CREATE TABLE charity_organizations (
    id SERIAL PRIMARY KEY,
    charity_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    registration_number VARCHAR(100),
    wallet_address VARCHAR(255),
    supported_currencies TEXT[], -- Array of supported currencies
    website VARCHAR(255),
    contact_email VARCHAR(255),
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Token conversion rates table
CREATE TABLE token_rates (
    id SERIAL PRIMARY KEY,
    currency VARCHAR(3) NOT NULL,
    tokens_per_unit DECIMAL(15,8) NOT NULL,
    effective_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(currency, effective_date)
);

-- Zakat certificates table
CREATE TABLE zakat_certificates (
    id SERIAL PRIMARY KEY,
    payment_id VARCHAR(50) REFERENCES zakat_payments(payment_id),
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    recipient_name VARCHAR(255) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    charity_name VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    hijri_date VARCHAR(50),
    pdf_url VARCHAR(500),
    verification_code VARCHAR(50) UNIQUE,
    is_valid BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table for tracking usage
CREATE TABLE analytics_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    country_code VARCHAR(3),
    currency VARCHAR(3),
    user_id INTEGER REFERENCES users(id),
    session_id VARCHAR(255),
    event_data JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Indexes for better performance
CREATE INDEX idx_users_country ON users(country_code);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_nisab_currency_date ON nisab_values(currency, effective_date DESC);
CREATE INDEX idx_calculations_user ON zakat_calculations(user_id);
CREATE INDEX idx_calculations_date ON zakat_calculations(calculation_date DESC);
CREATE INDEX idx_payments_status ON zakat_payments(status);
CREATE INDEX idx_payments_date ON zakat_payments(payment_date DESC);
CREATE INDEX idx_payments_user ON zakat_payments(user_id);
CREATE INDEX idx_charity_country ON charity_organizations(country_code);
CREATE INDEX idx_analytics_type_date ON analytics_events(event_type, timestamp DESC);
CREATE INDEX idx_certificates_payment ON zakat_certificates(payment_id);
CREATE INDEX idx_certificates_verification ON zakat_certificates(verification_code);

-- Views for common queries
CREATE VIEW current_nisab_values AS
SELECT DISTINCT ON (currency) 
    currency, 
    value, 
    gold_price_per_gram, 
    effective_date
FROM nisab_values 
ORDER BY currency, effective_date DESC;

CREATE VIEW current_token_rates AS
SELECT DISTINCT ON (currency) 
    currency, 
    tokens_per_unit, 
    effective_date
FROM token_rates 
ORDER BY currency, effective_date DESC;

CREATE VIEW zakat_summary_by_country AS
SELECT 
    country_code,
    currency,
    COUNT(*) as total_calculations,
    SUM(CASE WHEN nisab_status = 'above' THEN 1 ELSE 0 END) as eligible_calculations,
    SUM(zakat_amount) as total_zakat_calculated,
    AVG(crypto_assets) as avg_crypto_assets,
    DATE_TRUNC('month', calculation_date) as month
FROM zakat_calculations 
GROUP BY country_code, currency, DATE_TRUNC('month', calculation_date)
ORDER BY month DESC, country_code;
