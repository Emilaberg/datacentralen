


-- OBS!!!!!!!!!!!!!!!!
-- OM TEXTERNA SKA BLI I RÄTT FORMAT ÄR DET SUPERVIKTIGT ATT DET ÄR SKRIVET SÅ SOM NEDAN, DET GÅR INTE ATT HA DET SOM EN LÅNG STÄNG I EN QUERY



insert into Articles (Title, Author, Posted, LastEdited, Likes, Content, Description, Type, ColorCodeOne,ColorCodeTwo)
values 
--('','',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, '', '', '', '', '' )
('Quick Sort','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, '### **Introduktion**   
Quicksort är en sorteringsalgoritm av typen "Divide and Conquer", vilket är en metod att lösa problem där man delar upp det stora problemet i mindre delar, löser dem och sedan "mergar" resultaten.

### **Hur fungerar QuickSort?**   
Quicksort är en effektiv sorteringsalgoritm som bygger på principen *Divide and Conquer*. Den fungerar genom att dela upp en lista i mindre delar, sortera dessa var för sig och sedan kombinera resultaten. Genom att välja ett pivot-element och placera alla mindre värden på ena sidan och större på den andra, kan algoritmen snabbt sortera listan genom rekursion.

Den är känd för sin snabba prestanda och används ofta i praktiska tillämpningar där effektiv sortering behövs.

### **Hur påverkar tidskomplexiteten prestandan för Quicksort vid olika datamängder?**

Det beror på datamängden och hur datan redan är organiserad.

* **Genomsnittligt fall**: Genomsnittlig tidskomplexitet på O(n log n), vilket gör den mycket effektiv för stora mängder data.  
* **Bästa fall**: Om pivot-elementet alltid delar listan i två lika stora delar, är tidskomplexiteten densamma.  
* **Värsta fall**: Om listan redan är sorterad eller om pivot-elementet alltid är det minsta eller största elementet, kan tidskomplexiteten bli O(n2). Detta kan undvikas genom att välja pivot slumpmässigt eller att använda medianen som pivot.

### **Vilka är de vanligaste användningsområdena för Quicksort i praktiska applikationer?**  
   
Quicksort är en mycket populär sorteringsalgoritm som används i många praktiska applikationer på grund av sin hastighet och effektivitet. I databaser används Quicksort för att snabbt och effektivt sortera stora mängder data, vilket är avgörande för att optimera sökningar och datahantering. Sökmotorer använder Quicksort för att sortera och ranka sökresultat baserat på relevans och andra kriterier, vilket förbättrar användarupplevelsen. Inom grafik och bildbehandling används Quicksort för att sortera pixelvärden och andra data i olika bildbehandlingsalgoritmer. Quicksort används även i operativsystemens schemaläggningsalgoritmer för att optimera resursallokering och processhantering.

### **Hur hanterar Quicksort minnesanvändning och vad är dess minnesfotavtryck?**

Quicksort är en in-place-algoritm, vilket innebär att den sorterar elementen utan att använda extra minne för en kopia av listan. Detta görs genom att omorganisera elementen direkt i den ursprungliga listan. Minnesanvändningen begränsas huvudsakligen till den rekursiva anropsstacken. Minnesfotavtrycket för Quicksort är O(log n) i genomsnitt. Detta beror på att varje rekursivt anrop delar listan i två delar, och djupet på rekursionen är proportionellt mot logaritmen av antalet element i listan. I värsta fall, när listan är redan sorterad eller om pivotvalet är dåligt, kan minnesfotavtrycket bli O(n). Sammanfattningsvis är Quicksort mycket minneseffektiv i genomsnitt, men det är viktigt att optimera pivotvalet för att undvika värsta fall-scenarier.

### **Vilka är för- och nackdelarna med Quicksort jämfört med andra sorteringsalgoritmer?**

Quicksorts lokaliserade och rekursiva natur gör den också cache-vänlig, vilket förbättrar prestandan genom att minska cache-missar. Algoritmen är dessutom flexibel och kan användas för olika datatyper och anpassade jämförelsefunktioner.

Trots dessa fördelar har Quicksort också några nackdelar. I värsta fall, när listan redan är sorterad eller om pivotvalet är dåligt, kan tidskomplexiteten bli O(n2). Quicksort är också en instabil sorteringsalgoritm, vilket innebär att samma element kan få olika inbördes ordning i utdata. Prestandan för Quicksort är starkt beroende av valet av pivot, och ett dåligt val kan leda till ineffektiv sortering. Dessutom använder Quicksort rekursion, vilket kan leda till stack overflow om rekursionsdjupet blir för stort.

### **Jämförelse med andra algoritmer**:

* Merge Sort: Merge Sort har en garanterad tidskomplexitet på O(n log n) i både bästa och värsta fall, men kräver extra minne för att lagra kopior av listan.  
* Heap Sort: Heap Sort har också en tidskomplexitet på O(n log n) och är minneseffektiv, men är ofta långsammare i praktiken jämfört med Quicksort.  
* Bubble Sort och Insertion Sort: Dessa algoritmer är enklare att implementera men har en tidskomplexitet på O(n2) i genomsnitt, vilket gör dem ineffektiva för stora dataset.

Sammanfattningsvis är Quicksort en mycket effektiv och snabb sorteringsalgoritm för stora dataset, men dess prestanda kan påverkas av dåligt pivotval och rekursionsdjup. Merge Sort och Heap Sort är bra alternativ med stabil prestanda, medan enklare algoritmer som Bubble Sort och Insertion Sort är bättre för små dataset eller nästan sorterade listor.

### Källor

[https://www.geeksforgeeks.org/quick-sort-algorithm/](https://www.geeksforgeeks.org/quick-sort-algorithm/)

[https://medium.com/@alejandro.itoaramendia/quick-sort-a-complete-guide-4c0a7f86ed72](https://medium.com/@alejandro.itoaramendia/quick-sort-a-complete-guide-4c0a7f86ed72)

[https://en.wikipedia.org/wiki/Quicksort](https://en.wikipedia.org/wiki/Quicksort)

[https://www.geeksforgeeks.org/introduction-to-divide-and-conquer-algorithm/](https://www.geeksforgeeks.org/introduction-to-divide-and-conquer-algorithm/)', 'Dela upp listan vid en pivot och sortera delarna rekursivt', 'Sorteringsalgoritm', '#F9B66B', '#F7E6D3' ),

('Merge Sort','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, '### **Introduktion**  
Merge Sort är en stabil och effektiv sorteringsalgoritm med en tidskomplexitet på  
O(n log ⁡n) i alla fall. Den används ofta för stora dataset och externa sorteringar där stabilitet och konsekvent prestanda är viktiga faktorer. Trots att den kräver extra minne är den ett populärt val i många applikationer.

### **Hur fungerar Merge Sort?**  
Merge Sort använder en "Divide and Conquer"-strategi där listan delas upp i mindre delar tills varje del består av ett enda element. Därefter slås delarna samman i ordning, vilket skapar en sorterad lista. Denna rekursiva process säkerställer en effektiv sortering.

### **Hur påverkar tidskomplexiteten prestandan för Merge sort vid olika datamängder?**  
Merge Sort bibehåller en tidskomplexitet på O(n log⁡ n) i bästa, genomsnittliga och värsta fall.

* **Bästa fal**l: Även en redan sorterad lista kräver full uppdelning och sammanslagning.  
* **Genomsnittligt fall**: Algoritmen fungerar likadant oavsett indata.  
* **Värsta fall**: En omvänd sorterad lista påverkar inte komplexiteten.

### **Vilka är de vanligaste användningsområdena för Merge sort i praktiska applikationer?**  
Merge Sort används i system som hanterar stora datamängder, exempelvis:

* **Databaser & dataanalys**: Effektiv sortering av stora dataset.  
* **Extern sortering**: Hantering av data på hårddiskar eller SSD:er.  
* **Parallell bearbetning**: Lämplig för multi-threading på grund av sin struktur.  
* **Branschapplikationer**: Exempelvis inom finans (transaktionsdata), sjukvård (patientjournaler) och logistik (ruttoptimering).

### **Hur hanterar Merge Sort minnesanvändning och vad är dess minnesfotavtryck?**

Merge Sort kräver O(n) extra minne för temporära listor, vilket kan vara en nackdel vid stora dataset. Algoritmen är inte in-place, vilket innebär att den använder mer minne jämfört med exempelvis Quicksort.

###**Vilka är för- och nackdelarna med Merge Sort jämfört med andra sorteringsalgoritmer?**

##**Fördelar med Merge Sort:**

* **Konsekvent prestanda**: Merge Sort har en tidskomplexitet på O(n log n) i både bästa, genomsnittliga och värsta fall, vilket gör den mycket pålitlig för stora dataset.

* **Stabil sortering**: Merge Sort är en stabil sorteringsalgoritm, vilket innebär att den bevarar den relativa ordningen för lika element.

* **Lämplig för externa sorteringar**: Merge Sort fungerar bra för att sortera data som är för stor för att rymmas i minnet, genom att dela upp data i mindre delar och sedan slå samman dem.

* **Parallelliserbar**: På grund av sin "Divide and Conquer"-natur kan Merge Sort enkelt parallelliseras, vilket gör den lämplig för applikationer som drar nytta av parallell bearbetning.

## **Nackdelar med Merge Sort:**

* **Minnesanvändning**: Merge Sort kräver extra minne för att lagra temporära listor under sammanslagningsprocessen, vilket ger en minneskomplexitet på O(n).

* **Inte in-place**: Eftersom Merge Sort inte är en in-place-algoritm, kräver den extra minne proportionellt mot storleken på den lista som sorteras.

* **Långsammare för små dataset**: För små dataset kan Merge Sort vara långsammare än enklare algoritmer som Insertion Sort eller Bubble Sort på grund av dess högre overhead (t.ex. rekursiva anrop och sammanslagning).

* **Rekursiv overhead**: Merge Sort förlitar sig starkt på rekursion, vilket kan leda till ytterligare overhead i form av funktionsanrop och stackutrymme.

Sammanfattningsvis är Merge Sort en mycket effektiv och stabil sorteringsalgoritm för stora dataset, men dess prestanda kan påverkas av dess minneskrav och rekursiva overhead. Quicksort och Heap Sort är bra alternativ med sina egna fördelar och nackdelar, medan enklare algoritmer som Bubble Sort och Insertion Sort är bättre för små dataset eller nästan sorterade listor.

# **Källor**  
[https://www.w3schools.com/dsa/dsa\_algo\_mergesort.php](https://www.w3schools.com/dsa/dsa_algo_mergesort.php)  
[https://www.geeksforgeeks.org/merge-sort/](https://www.geeksforgeeks.org/merge-sort/)  
[https://en.wikipedia.org/wiki/Merge\_sort](https://en.wikipedia.org/wiki/Merge_sort)  
', 'Dela och erövra genom att dela listan och sammanfoga de sorterade delarna.', 'Sorteringsalgoritm', '#90EE90', '#D8FAD4' ),

('Array','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, '### **Introduktion**  
Arrayer är en grundläggande datastruktur inom programmering som används för att lagra flera värden under ett och samma namn. De gör det möjligt att hantera och organisera data på ett strukturerat sätt, vilket är särskilt användbart vid hantering av stora datamängder.

Arrayer används i nästan alla programmeringsspråk och har en central roll i allt från enkla applikationer till komplexa system, såsom databashantering, grafikrendering och algoritmer för databehandling. Deras struktur gör det enkelt att lagra, sortera och komma åt data effektivt, vilket gör dem till ett av de mest använda verktygen inom programmering.

Olika språk hanterar arrayer på olika sätt – vissa har statiska arrayer med en fast storlek, medan andra erbjuder mer flexibla lösningar där innehållet kan ändras dynamiskt. Oavsett implementation är arrayer en nyckelkomponent i modern mjukvaruutveckling.

### **Hur fungerar en array?**

En array är som en rad med fack i en låda, där varje fack har ett nummer (index) och innehåller ett värde. Dessa värden måste ofta vara av samma typ, beroende på programmeringsspråket. Indexeringen börjar vanligtvis på 0, vilket betyder att det första elementet finns på plats 0, det andra på plats 1, och så vidare.

När en array skapas reserveras ett visst utrymme i minnet för att lagra ett förutbestämt antal element. Detta gör att vi snabbt kan hämta ett specifikt värde genom att ange dess index – en operation som har en konstant tidskomplexitet (O(1)).

I vissa språk, som C och Java, har arrayer en fast storlek, vilket innebär att en ny array måste skapas om mer utrymme behövs. Detta kan vara resurskrävande eftersom hela innehållet måste kopieras till den nya arrayen. Andra språk, som JavaScript och Python, erbjuder dynamiska arrayer som kan växa vid behov samt innehålla olika datatyper, men även dessa kan ha prestandakostnader beroende på hur de hanteras i bakgrunden.

### **Hur påverkar insättnings- och borttagningsoperationer prestandan i arrays?**

* **I slutet av arrayen** – Att lägga till ett nytt element i en statisk array (t.ex. i C eller Java) kräver att det finns ledigt utrymme, annars måste en ny större array skapas, vilket innebär en kostsam kopieringsoperation. Dynamiska arrays (som i JavaScript och Python) hanterar detta genom att automatiskt allokera mer minne vid behov, men detta kan leda till omallokeringar som påverkar prestandan.  
* **I början eller mitten av arrayen** – Insättning och borttagning innebär att alla efterföljande element måste flyttas för att behålla den sekventiella ordningen. Detta gör operationen linjär i tid, O(n), vilket är ineffektivt jämfört med andra datastrukturer som linked lists där insättning och borttagning kan ske i O(1).  
* **Indexering och sökning** – Eftersom arrays lagrar element i ett sammanhängande minnesblock, kan man snabbt komma åt ett element med dess index i O(1)-tid. Däremot påverkas prestandan negativt om arrayen måste omstruktureras vid insättning eller borttagning.

### **Vilka är de vanligaste användningsområdena för en array i moderna applikationer?**  
De vanligaste användningsområdena för arrays är att lagra och hantera sekventiell data, såsom listor av objekt, användardata och buffrar. De används ofta i databearbetning, exempelvis för att hantera stora dataset i maskininlärning eller sorteringsalgoritmer. Inom webb- och apputveckling används arrays för att lagra dynamiskt innehåll, såsom kommentarer eller produktlistor. Spelutveckling är ett annat vanligt användningsområde där arrays används för att hantera spelkartor och objektpositioner. Arrays är också vanliga i multimedia- och nätverksapplikationer, där de används i ljud- och videobuffrar.  
**Hur hanterar en array minnesallokering och vad är dess minnesfotavtryck?**  
Arrays hanterar minnesallokering genom att reservera ett sammanhängande block av minne vid skapandet. I språk som C och Java har arrays en fast storlek, vilket gör att minnet allokeras direkt och kan nås med konstant tidskomplexitet O(1). Dynamiska arrays, såsom de i JavaScript och Python, använder däremot en underliggande implementation som expanderar vid behov genom att skapa en ny större array och kopiera över innehållet, vilket ökar minnesanvändningen och har en högre prestandakostnad.

Minnesfotavtrycket för en array beror på elementens datatyp och eventuellt extra overhead. I lågnivåspråk används endast den nödvändiga mängden minne för att lagra värdena, medan högnivåspråk ofta inkluderar extra metadata, såsom arrayens storlek och referenser, vilket gör dem mer flexibla men också mer minneskrävande.

### **Vilka algoritmer är optimerade för att arbeta med arrays och varför?**  
Algoritmer som binärsökning, sorteringsalgoritmer, hashing och sliding window fungerar bra med arrays eftersom dessa datastrukturer erbjuder snabb åtkomst till element via index (O(1)-tid) och har fast storlek eller dynamisk storlek som gör det möjligt att snabbt omorganisera och manipulera data i vissa fall.

### Källor  
[https://en.wikipedia.org/wiki/Array\_(data\_structure)](https://en.wikipedia.org/wiki/Array_\(data_structure\))

[https://medium.com/@duplessisjdp96/data-structure-stories-the-array-18f4648c414e](https://medium.com/@duplessisjdp96/data-structure-stories-the-array-18f4648c414e)

[https://www.geeksforgeeks.org/introduction-to-arrays-data-structure-and-algorithm-tutorials/](https://www.geeksforgeeks.org/introduction-to-arrays-data-structure-and-algorithm-tutorials/)', 'En samling av element lagrade i en ordnad sekvens, åtkomliga via index.', 'Datastruktur', '#83EDBB', '#D3F7E6' ),

('Linked List','Johannes Nilsson',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, '### **Introduktion**
En linked-list (länkad lista) är en datastruktur där varje element, eller nod, innehåller två delar: ett värde (data) och en pekare till nästa nod i listan. Till skillnad från en array, där alla element lagras i ett sammanhängande block, är varje nod i en linked-list belägen på en separat minnesadress. Detta gör att linked-lists är mycket flexibla när det gäller att lägga till eller ta bort element dynamiskt, eftersom man inte behöver omallokera hela strukturen vid förändringar. Men detta innebär också att de inte har samma snabba åtkomsttider som arrayer.

### **Hur fungerar en Linked-List?**
En linked-list börjar med en nod, som kallas för "head". Denna nod pekar på nästa nod i listan, och så vidare, tills man når en nod som pekar på null, vilket markerar slutet på listan. För att komma åt ett element i listan, börjar man vid "head"-noden och följer pekarna från nod till nod. Detta gör att åtkomsttiden är linjär (O(n)), vilket innebär att det kan ta längre tid att hitta ett element i en linked-list jämfört med en array där åtkomst sker direkt via index.

### **Vilka är de vanligaste användningsområdena för linked-list i moderna applikationer?**
Linked-lists är särskilt användbara i situationer där man ofta behöver lägga till eller ta bort element från början eller slutet av listan. Till exempel används de för att implementera stackar och köer, där insättning och borttagning sker effektivt från dessa positioner. En annan fördel är att de inte kräver förhandsallokering av minne som en array, vilket gör att de kan växa dynamiskt utan att behöva omstrukturera hela listan.

De används också i grafteori för att representera adjacenslistor, där varje nod pekar på sina grannar, och vid minneshantering i operativsystem, där flexibla allokeringar och frigöringar är viktiga. Linked-lists är också användbara i realtidsapplikationer där datastorleken förändras snabbt och där det är viktigt att kunna lägga till eller ta bort objekt utan att påverka andra delar av minnet.

### **Hur påverkar insättnings- och borttagningsoperationer prestandan i linked-list?**  
En av linked lists största styrkor är dess effektivitet vid insättning och borttagning, särskilt i början eller slutet. Dessa operationer sker i O(1) eftersom det endast krävs att uppdatera pekarna till noderna.

Däremot, om ett element ska läggas till eller tas bort på en specifik plats, måste listan först traverseras för att hitta rätt position, vilket gör operationen O(n). En dubbel-länkad lista kan förbättra detta genom att varje nod har två pekare – en till föregående och en till nästa nod. Detta gör att vi kan navigera i båda riktningarna och effektivisera borttagningar.

### **Hur hanterar linked-list minnesallokering och vad är dess minnesfotavtryck?**
En nackdel med linked-lists är att de har ett högre minnesfotavtryck jämfört med exempelvis arrayer. För varje nod krävs extra minne för pekaren som binder samman noderna. Till exempel, i en enkel länkad lista, om varje nod innehåller ett värde på 4 byte och pekaren på 8 byte på ett 64-bitars system, kommer varje nod att ta upp 12 byte minne. Detta gör att linked-lists är mindre minnesvänliga än arrayer, där all data lagras i ett sammanhängande block.

### **Vilka algoritmer är optimerade för att arbeta med linked-list och varför?**
Linked-lists är också bra för att implementera algoritmer som kräver snabb dynamisk allokering och omstrukturering av data. Till exempel används de vid algoritmer för att sammanfoga två sorterade listor eller vända en lista, eftersom dessa operationer kan utföras genom att enkelt uppdatera pekarna i listan utan att flytta på data. Detta gör att linked-lists är mycket effektiva för att manipulera och omstrukturera data snabbt.

## Källor
[https://www.geeksforgeeks.org/linked-list-data-structure/](https://www.geeksforgeeks.org/linked-list-data-structure/)

[https://en.wikipedia.org/wiki/Linked\_list](https://en.wikipedia.org/wiki/Linked_list)

[https://medium.com/@anderson.dylan.522/linked-lists-4fce0c482d57](https://medium.com/@anderson.dylan.522/linked-lists-4fce0c482d57)  
', 'En linjär datastruktur där varje element pekar på nästa element i sekvensen.', 'Datastruktur', '#FF8C00', '#FFE5B3' ),

('Heap Sort','Emil Åberg',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, '### **Introduktion** 

Heap sort är en effektiv sorteringsalgoritm som är jämförelsebaserad. Den fungerar genom att ta en osorterad array och bygga om den till en så kallad heap. En heap är en datastruktur som organiserar elementen i en array baserat på deras storlek, där varje nod är större än sina barn. En heap representeras ofta som ett träd.

Fördelen med att använda heap sort är dess enkla implementation och gynnsamma "worst case"-tidskomplexitet, även om en väl implementerad quicksort kan vara snabbare.  
I praktiken används heap sort ofta som en fallback i quicksort-implementationer, där heap sort används om quicksorts prestanda försämras.

Eftersom heapsort arbetar direkt på arrayen och inte kräver extra minne, är det en så kallad in-place algoritm. Det är dock värt att notera att heap sort är en ostabil sorteringsalgoritm, vilket innebär att den sorterade datan kan hamna i olika ordning beroende på vad som sorteras.

### **Hur fungerar en Heap sort?**

För att förstå hur heap sort fungerar, behöver vi förklara vad datastrukturen heap är. En heap är en sorts datastruktur och en speciell typ av binärt träd som uppfyller heap-egenskapen. Det finns två typer av heaps: max-heap och min-heap.

- Max-heap: Varje nod är större än eller lika med sina children. Detta innebär att det största elementet alltid finns i roten.  
- Min-heap: Varje nod är mindre än eller lika med sina children. Detta innebär att det minsta elementet alltid finns i roten.

En heap sort fungerar på ett relativt enkelt sätt. Den består av tre delar. Första delen innebär att vi bygger om den osorterade arrayen till en max-heap. I andra delen byter vi plats på roten och det sista elementet i arrayen. I sista delen minskar vi heapens storlek med en och anropar en heapify-funktion, vilket bygger om arrayen till en ny max-heap.

1. Bygg en max-heap: Först omvandlar vi den osorterade arrayen till en max-heap. En max-heap är en binär trädstruktur där varje förälder är större än eller lika med sina barn.  
     
2. Byt plats på rot och sista elementet: Efter att ha byggt max-heapen, byter vi plats på roten (det största elementet) och det sista elementet i heapen. Detta placerar det största elementet på sin rätta plats i den sorterade arrayen.  
     
3. Minska heapens storlek: Vi minskar storleken på heapen med en och anropar heapify på roten för att säkerställa att heap-egenskapen bibehålls.  
4. Upprepa processen: Vi upprepar steg 2 och 3 tills hela arrayen är sorterad.

pseudokod för referens

### **Hur påverkar tidskomplexiteten prestandan för heap-sort vid olika datamängder?**

Heap sorts tidskomplexitet är O(n log n) i alla fall. Detta beror på att heap sort har två delar:

1. ta ut det största element från heapen (root elementet)  
2. köra heapify operationer för att skapa e ny heap för de element som är kvar

Så, för en array av storlek n, kommer vi att heapify trädet n gånger. Eftersom varje heap-operation kostar O(logn), kommer n heap-operationer alltså att kosta O(nlogn).

### **Vilka är de vanligaste användningsområdena för heap-sort i praktiska applikationer?**

Då heapsort inte kräver extra minne för att köras, fungerar heap sort bra att använda i miljöer med begränsad minneshantering. På grund av tidskomplexitet är heap sort fördelaktigt att använda i områden där konsekvens är viktigt.

### **Hur hanterar heap-sort minnesanvändning och vad är dess minnesfotavtryck?**

Heap sort är en så kallad in-place algoritm, så den behöver inte någon extra minnesstorlek för att användas, utan arbetar på storleken av arrayen.

### **Vilka är för- och nackdelar med heap-sort jämfört med andra sorteringsalgoritmer?**

Även om heap sort är konsekvent så finns det andra algoritmer som både är snabbare och stabilare än heapsort. Heap sort är en ostabil sorteringsalgoritm och bör inte användas där ordningen på elementen är viktig.

### Källor

[**Heap Sort \- Data Structures and Algorithms Tutorials \- GeeksforGeeks**](https://www.geeksforgeeks.org/heap-sort/)

[**Heapsort \- Wikipedia**](https://en.wikipedia.org/wiki/Heapsort)

[**Exploring Time and Space Complexities of Heap Sort**](https://programiz.pro/resources/dsa-heap-sort-complexity/)

[**pseudocode \- Why is the time complexity of Heap Sort, O(nlogn)? \- Stack Overflow**](https://stackoverflow.com/questions/54078858/why-is-the-time-complexity-of-heap-sort-onlogn)

', 'Använder en heap för att sortera genom att extrahera största/minsta elementet.', 'Sorteringsalgoritm', '#79ACE4', '#D3E4F7' ),

('Hash Table','Emil Åberg',GETUTCDATE(), DATEADD(DAY, 2, GETUTCDATE()), 0, '### **Introduktion**

En hash table är en typ av datastruktur inom data science och programmering. Ett hash table består av en nyckel och ett värde. Nyckeln används för att hitta värdet i hashtabellen och kan vara en integer eller en string.

En dictionary i exempelvis C\# eller en map array i exempelvis JavaScript och TypeScript är båda exempel på hashtables. De implementerar en så kallad associative array, vilket är en abstrakt datatyp som mappar nycklar till värden.

Hash tables använder sig av en hash-funktion för att räkna ut ett index. Detta index blir sedan platsen i hashtabellen där värdet kommer att sparas.

### **Hur fungerar en hash-funktion?**

En hash-funktion används för att beräkna ett hashat värde beroende på nyckelns värde. Den hash-funktion som används kan variera beroende på typen av nyckel. Är nyckeln en integer så är det beräknade värdet detsamma som ursprungsvärdet. Om nyckeln är en string beräknas det på ett annat sätt.

För att beräkna platsen som ett värde ska ha i en hash table behöver man:

1. Beräkna ett hashat värde av nyckeln.  
2. Dela det hashade värdet med kapaciteten på hash tabellen.  
3. Resten av divisionen (hashvärdet % kapaciteten) blir index.

Först beräknas ett hashat värde beroende på nyckelns värde. Därefter delas hashvärdet med kapaciteten av hash tabellen (t.ex. om storleken på tabellen är 10, delas det hashade värdet med 10, är det 16, delas det med 16, osv.). Resten av divisionen blir index på värdet.

Varje entry läggs till i en "bucket" vid det beräknade indexet. Om två nycklar får samma beräknade rest bildar dessa en länkad lista i samma bucket.

### **Hur påverkar insättnings- och borttagningsoperationer prestandan i hashtabeller?**

Tids- och rymdkomplexiteten för en hashtabell beror på hur väl den är designad. En väl designad hashtabell har en konstant tidskomplexitet på O(1), där tiden för algoritmen är konstant oavsett storleken på inputen. En dåligt designad hashtabell har en tidskomplexitet på O(n). vilket är en s.k linjär tidskomplexitet, där tiden för algoritmen ökar linjärt beroende på storleken av inputen. Detta inträffar när det finns många kollisioner mellan flera entries, där varje bucket skapar en länkad lista som måste genomsökas. En lösning är att öka storleken på hashtabellen så att det inte bildas nycklar med samma index, nackdelen blir den större array som man behöver söka igenom. En väl designad hashmap har en tids- och rymdkomplexitet på O(1) för enkel insertion, lookup och deletion.

### **Vilka är de vanligaste användningsområdena för hashtabeller i moderna applikationer?**

De vanligaste användningsområdena för hashtabeller är i olika associative arrays, database indexering, caches och olika datasets. De används vanligtvis i in-memory-tabeller för associative arrays. Localstorage är ett bra exempel som implementerar hash tabeller, där du har en key och ett value. För att undvika kollisioner i caches kan man ta bort en av de kolliderade värdena, vilket vanligtvis blir det gamla värdet som skrivs över.

### **Hur hanterar hashtabeller minnesallokering och vad är dess minnesfotavtryck?**

Genom att skapa så kallade buckets eller bins, som består av länkade listor, håller hashtabellen koll på vilket värde som är vilket och sparar datan beroende på det. Antingen sparas värdet på varje index eller i buckets eller bins om värden med samma index kolliderar, då sparas de i en länkad lista.

### **Vilka algoritmer är optimerade för att arbeta med hashtabeller och varför?**

Det finns olika algoritmer som kan användas för hashtables. SHA-256 är en av de säkrare algoritmerna att använda. Det finns dock andra algoritmer som kan arbeta snabbare när säkerhet inte är det viktigaste, som exempelvis Murmur.

För mer information om de olika algoritmernas prestanda, kolla gärna denna post på Stack Exchange: [Link](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed)

### Källor  
[What is a Hash Map? Time Complexity and Two Sum Example](https://www.freecodecamp.org/news/what-is-a-hash-map/)

[Hash table \- Wikipedia](https://en.wikipedia.org/wiki/Hash_table)

[(130) Learn Hash Tables in 13 minutes \#️⃣ \- YouTube](https://www.youtube.com/watch?v=FsfRsGFHuv4)

[security \- Which hashing algorithm is best for uniqueness and speed? \- Software Engineering Stack Exchange](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed)', 'Lagrar nyckel-värdepar och använder en hash-funktion för snabb åtkomst.', 'Datastruktur', '#F5F886', '#F6F7D3' )


select * From Articles