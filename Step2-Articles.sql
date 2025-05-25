insert into Articles (Title, Author, Posted, LastEdited, Likes, ArticleContentId, Description, Type, ColorCodeOne,ColorCodeTwo)
values 
('Quick Sort','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 1, 'Dela upp listan vid en pivot och sortera delarna rekursivt', 'Sorteringsalgoritm', '#F9B66B', '#F7E6D3' ),
('Merge Sort','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 2 , 'Dela och erövra genom att dela listan och sammanfoga de sorterade delarna.', 'Sorteringsalgoritm', '#90EE90', '#D8FAD4' ),
('Array','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 3, 'En linjär datastruktur där varje element pekar på nästa element i sekvensen.', 'Datastruktur', '#FF8C00', '#FFE5B3' ),
('Linked List','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 4, 'En linjär datastruktur där varje element pekar på nästa element i sekvensen.', 'Datastruktur', '#FF8C00', '#FFE5B3' ),
('Heap Sort','Emil Åberg',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 5, 'Använder en heap för att sortera genom att extrahera största/minsta elementet.', 'Sorteringsalgoritm', '#79ACE4', '#D3E4F7'  ),
('Hash Table','Emil Åberg',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 6, 'Lagrar nyckel-värdepar och använder en hash-funktion för snabb åtkomst.', 'Datastruktur', '#F5F886', '#F6F7D3' )
