-- Seed data for Zakat Calculator ASEAN
-- Insert initial nisab values and charity organizations

-- Insert current nisab values (based on 85g gold @ ~$65/gram as of 2024)
INSERT INTO nisab_values (currency, value, gold_price_per_gram, effective_date) VALUES
('MYR', 21500.00, 253.00, '2024-01-01'),
('SGD', 7225.00, 85.00, '2024-01-01'),
('IDR', 14500000.00, 1705882.35, '2024-01-01'),
('THB', 54000.00, 635.29, '2024-01-01'),
('PHP', 128000.00, 1505.88, '2024-01-01'),
('BND', 7225.00, 85.00, '2024-01-01'),
('KHR', 29000000.00, 3411764.71, '2024-01-01'),
('LAK', 460000000.00, 54117647.06, '2024-01-01'),
('MMK', 45000000.00, 529411.76, '2024-01-01'),
('VND', 540000000.00, 6352941.18, '2024-01-01');

-- Insert token conversion rates
INSERT INTO token_rates (currency, tokens_per_unit, effective_date) VALUES
('MYR', 100.00000000, '2024-01-01'),
('SGD', 330.00000000, '2024-01-01'),
('IDR', 0.00900000, '2024-01-01'),
('THB', 13.00000000, '2024-01-01'),
('PHP', 0.18000000, '2024-01-01'),
('BND', 330.00000000, '2024-01-01'),
('KHR', 0.00240000, '2024-01-01'),
('LAK', 0.00012000, '2024-01-01'),
('MMK', 0.00150000, '2024-01-01'),
('VND', 0.00004000, '2024-01-01');

-- Insert verified charity organizations
INSERT INTO charity_organizations (charity_id, name, country_code, registration_number, wallet_address, supported_currencies, website, contact_email, is_verified, is_active) VALUES
('JAKIM-001', 'Jabatan Kemajuan Islam Malaysia', 'MYS', 'JAKIM-2024-001', '0x1234567890abcdef1234567890abcdef12345678', ARRAY['MYR'], 'https://www.islam.gov.my', 'zakat@islam.gov.my', true, true),
('MAIWP-001', 'Majlis Agama Islam Wilayah Persekutuan', 'MYS', 'MAIWP-2024-001', '0x2345678901bcdef12345678901bcdef123456789', ARRAY['MYR'], 'https://www.maiwp.gov.my', 'zakat@maiwp.gov.my', true, true),
('MUIS-001', 'Majlis Ugama Islam Singapura', 'SGP', 'MUIS-2024-001', '0x3456789012cdef123456789012cdef1234567890', ARRAY['SGD'], 'https://www.muis.gov.sg', 'zakat@muis.gov.sg', true, true),
('MUI-001', 'Majelis Ulama Indonesia', 'IDN', 'MUI-2024-001', '0x456789013def123456789013def12345678901a', ARRAY['IDR'], 'https://mui.or.id', 'zakat@mui.or.id', true, true),
('CICOT-001', 'Central Islamic Committee of Thailand', 'THA', 'CICOT-2024-001', '0x56789014ef123456789014ef12345678901ab', ARRAY['THB'], 'https://cicot.or.th', 'zakat@cicot.or.th', true, true),
('NCMF-001', 'National Commission on Muslim Filipinos', 'PHL', 'NCMF-2024-001', '0x6789015f123456789015f12345678901abc', ARRAY['PHP'], 'https://ncmf.gov.ph', 'zakat@ncmf.gov.ph', true, true),
('MUIB-001', 'Majlis Ugama Islam Brunei', 'BRN', 'MUIB-2024-001', '0x789016f123456789016f12345678901abcd', ARRAY['BND'], 'https://www.muib.gov.bn', 'zakat@muib.gov.bn', true, true),
('CIC-001', 'Cambodia Islamic Community', 'KHM', 'CIC-2024-001', '0x89017f123456789017f12345678901abcde', ARRAY['KHR'], 'https://www.cic.org.kh', 'zakat@cic.org.kh', true, true),
('LIC-001', 'Lao Islamic Community', 'LAO', 'LIC-2024-001', '0x9018f123456789018f12345678901abcdef', ARRAY['LAK'], 'https://www.lic.org.la', 'zakat@lic.org.la', true, true),
('MIC-001', 'Myanmar Islamic Community', 'MMR', 'MIC-2024-001', '0xa019f123456789019f12345678901abcdef1', ARRAY['MMK'], 'https://www.mic.org.mm', 'zakat@mic.org.mm', true, true),
('VIC-001', 'Vietnam Islamic Community', 'VNM', 'VIC-2024-001', '0xb01af123456789001af12345678901abcdef12', ARRAY['VND'], 'https://www.vic.org.vn', 'zakat@vic.org.vn', true, true);

-- Insert sample users for testing
INSERT INTO users (email, name, country_code, preferred_currency, phone) VALUES
('ahmad.malaysia@example.com', 'Ahmad bin Abdullah', 'MYS', 'MYR', '+60123456789'),
('siti.singapore@example.com', 'Siti binti Rahman', 'SGP', 'SGD', '+6591234567'),
('budi.indonesia@example.com', 'Budi Santoso', 'IDN', 'IDR', '+628123456789'),
('somchai.thailand@example.com', 'Somchai Jaidee', 'THA', 'THB', '+66812345678'),
('maria.philippines@example.com', 'Maria Santos', 'PHL', 'PHP', '+639123456789');

-- Insert sample zakat calculations
INSERT INTO zakat_calculations (user_id, country_code, currency, crypto_assets, debts, net_assets, nisab_threshold, nisab_status, zakat_amount, zakat_tokens, ip_address) VALUES
(1, 'MYS', 'MYR', 50000.00, 5000.00, 45000.00, 21500.00, 'above', 1125.00, 112500.00, '203.0.113.1'),
(2, 'SGP', 'SGD', 15000.00, 2000.00, 13000.00, 7225.00, 'above', 325.00, 107250.00, '203.0.113.2'),
(3, 'IDN', 'IDR', 20000000.00, 3000000.00, 17000000.00, 14500000.00, 'above', 425000.00, 3825.00, '203.0.113.3'),
(4, 'THA', 'THB', 80000.00, 10000.00, 70000.00, 54000.00, 'above', 1750.00, 22750.00, '203.0.113.4'),
(5, 'PHL', 'PHP', 200000.00, 20000.00, 180000.00, 128000.00, 'above', 4500.00, 810.00, '203.0.113.5');

-- Insert sample payments
INSERT INTO zakat_payments (payment_id, user_id, calculation_id, amount, currency, charity_id, payment_method, transaction_hash, status, certificate_url, blockchain_network) VALUES
('zkt2024-abc123', 1, 1, 1125.00, 'MYR', 'JAKIM-001', 'crypto_wallet', '0xabcdef1234567890abcdef1234567890abcdef12', 'completed', 'https://certificates.zakatcalculator.asean/zkt2024-abc123.pdf', 'ethereum'),
('zkt2024-def456', 2, 2, 325.00, 'SGD', 'MUIS-001', 'crypto_wallet', '0xbcdef1234567890abcdef1234567890abcdef123', 'completed', 'https://certificates.zakatcalculator.asean/zkt2024-def456.pdf', 'ethereum'),
('zkt2024-ghi789', 3, 3, 425000.00, 'IDR', 'MUI-001', 'crypto_wallet', '0xcdef1234567890abcdef1234567890abcdef1234', 'completed', 'https://certificates.zakatcalculator.asean/zkt2024-ghi789.pdf', 'ethereum');

-- Insert zakat certificates
INSERT INTO zakat_certificates (payment_id, certificate_number, recipient_name, amount, currency, charity_name, issue_date, hijri_date, pdf_url, verification_code) VALUES
('zkt2024-abc123', 'ZKT-MYS-2024-001', 'Ahmad bin Abdullah', 1125.00, 'MYR', 'Jabatan Kemajuan Islam Malaysia', '2024-01-15', '6 Rajab 1445', 'https://certificates.zakatcalculator.asean/zkt2024-abc123.pdf', 'VER-ABC123'),
('zkt2024-def456', 'ZKT-SGP-2024-001', 'Siti binti Rahman', 325.00, 'SGD', 'Majlis Ugama Islam Singapura', '2024-01-16', '7 Rajab 1445', 'https://certificates.zakatcalculator.asean/zkt2024-def456.pdf', 'VER-DEF456'),
('zkt2024-ghi789', 'ZKT-IDN-2024-001', 'Budi Santoso', 425000.00, 'IDR', 'Majelis Ulama Indonesia', '2024-01-17', '8 Rajab 1445', 'https://certificates.zakatcalculator.asean/zkt2024-ghi789.pdf', 'VER-GHI789');

-- Insert analytics events
INSERT INTO analytics_events (event_type, country_code, currency, user_id, event_data, ip_address) VALUES
('calculation_performed', 'MYS', 'MYR', 1, '{"assets": 50000, "zakat": 1125}', '203.0.113.1'),
('payment_completed', 'MYS', 'MYR', 1, '{"amount": 1125, "charity": "JAKIM-001"}', '203.0.113.1'),
('calculation_performed', 'SGP', 'SGD', 2, '{"assets": 15000, "zakat": 325}', '203.0.113.2'),
('payment_completed', 'SGP', 'SGD', 2, '{"amount": 325, "charity": "MUIS-001"}', '203.0.113.2'),
('app_download', 'IDN', 'IDR', 3, '{"platform": "android"}', '203.0.113.3');
