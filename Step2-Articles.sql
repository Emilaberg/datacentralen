insert into Articles (Title, Author, Posted, LastEdited, Likes, ArticleContentId, Description, Type, ColorCodeOne,ColorCodeTwo)
values 
('Quick Sort','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 1, 'Dela upp listan vid en pivot och sortera delarna rekursivt', 'Sorteringsalgoritm', '#F9B66B', '#F7E6D3' ),
('Merge Sort','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 2 , 'Dela och erövra genom att dela listan och sammanfoga de sorterade delarna.', 'Sorteringsalgoritm', '#90EE90', '#D8FAD4' ),
('Array','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 3, 'En linjär datastruktur där varje element pekar på nästa element i sekvensen.', 'Datastruktur', '#FF8C00', '#FFE5B3' ),
('Linked List','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 4, 'En linjär datastruktur där varje element pekar på nästa element i sekvensen.', 'Datastruktur', '#FF8C00', '#FFE5B3' ),
('Heap Sort','Emil Åberg',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 5, 'Använder en heap för att sortera genom att extrahera största/minsta elementet.', 'Sorteringsalgoritm', '#79ACE4', '#D3E4F7'  ),
('Hash Table','Emil Åberg',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 6, 'Lagrar nyckel-värdepar och använder en hash-funktion för snabb åtkomst.', 'Datastruktur', '#F5F886', '#F6F7D3' ),
('Shell Sort', 'Oscar Sommerfors',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 7, 'En förbättrad version av insertion sort som använder intervall för att sortera.', 'Sorteringsalgoritm', '#FFB6C1', '#FFE4E1' ),
('Counting Sort', 'Oscar Sommerfors',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 8, 'En icke-jämförande sorteringsalgoritm som räknar förekomsten av varje element.', 'Sorteringsalgoritm', '#DDA0DD', '#E6E6FA' ),
('Graph', 'Oscar Sommerfors',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 9, 'En datastruktur som representerar relationer mellan noder med kanter.', 'Datastruktur', '#ADD8E6', '#F0F8FF' ),
('Heap', 'Oscar Sommerfors',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 10, 'En komplett binär trädstruktur som används för att implementera prioritetsköer.', 'Datastruktur', '#FF6347', '#FFE4E1' ),
('Bubble Sort', 'Max Thärn',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 11, 'En enkel sorteringsalgoritm som upprepade gånger byter intilliggande element om de är i fel ordning.', 'Sorteringsalgoritm', '#FF4500', '#FFF5EE' ),
('Insertion Sort', 'Max Thärn',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 12, 'En enkel sorteringsalgoritm som bygger en sorterad sektion av listan.', 'Sorteringsalgoritm', '#32CD32', '#F0FFF0' ),
('Queue', 'Max Thärn',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 13, 'En datastruktur som följer FIFO-principen (först in, först ut).', 'Datastruktur', '#FFD700', '#FFFACD' ),
('Stack', 'Max Thärn',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, 14, 'En datastruktur som följer LIFO-principen (sist in, först ut).', 'Datastruktur', '#FF69B4', '#FFB6C1' );

