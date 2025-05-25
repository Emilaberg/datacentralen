UPDATE ArticleContents
SET ArticleId = CASE Id
    WHEN 1 THEN 1
    WHEN 2 THEN 2
    WHEN 3 THEN 3
    WHEN 4 THEN 4
    WHEN 5 THEN 5
    WHEN 6 THEN 6
END
WHERE Id IN (1, 2, 3, 4, 5, 6);
