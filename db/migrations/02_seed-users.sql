INSERT INTO users (username) VALUES
('malte'),
('timo'),
('johanna'),
('lisa'),
('mirco'),
('julia')
ON CONFLICT DO NOTHING;