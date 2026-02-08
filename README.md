# Family Manager - System ZarzÄ…dzania RodzinÄ…

## đźŽŻ Opis Projektu

Family Manager to nowoczesna aplikacja webowa typu PWA (Progressive Web App) do zarzÄ…dzania zadaniami i nagrodami dla dzieci. System oparty jest na filozofii 100%/0% - dzieĹ„ jest albo zaliczony (PASSED) albo niezaliczony (FAILED), bez procentĂłw i pĂłĹ‚Ĺ›rodkĂłw.

## âś¨ Kluczowe Funkcje

### System 100%/0%
- **PASSED**: DzieĹ„ aktywny z wszystkimi zadaniami MIN zatwierdzonymi
- **FAILED**: DzieĹ„ aktywny z przynajmniej jednym niezatwierdzonym zadaniem MIN
- **N/A**: DzieĹ„ nieaktywny (nie wpĹ‚ywa na passÄ™)

### Mechanika PunktĂłw (Opcja C)
- Punkty przyznawane **TYLKO** za zaliczony dzieĹ„ (PASSED)
- DomyĹ›lnie: 5 punktĂłw za dzieĹ„ PASSED
- Anty-dublowanie: punkty za ten sam dzieĹ„ tylko raz
- Brak punktĂłw za pojedyncze zadania
- Bonus za idealny tydzieĹ„: 20 punktĂłw (opcjonalny)

### System ZadaĹ„
- **MIN (â­ Minimum)**: Zadania obowiÄ…zkowe - decydujÄ… o zaliczeniu dnia
- **PLUS (đź’Ž Bonus)**: Zadania opcjonalne - nie wpĹ‚ywajÄ… na zaliczenie
- **WEEKLY (đźŹ† Tygodniowe)**: Zadania tygodniowe - nie wpĹ‚ywajÄ… na zaliczenie

### Passa (Streak)
- Liczba kolejnych dni aktywnych ze statusem PASSED
- Dni N/A nie przerywajÄ… passy
- Reset do 0 przy pierwszym FAILED

### Idealny TydzieĹ„
- TydzieĹ„ jest IDEAL gdy wszystkie dni aktywne majÄ… status PASSED
- WymĂłg: 100% dni aktywnych musi byÄ‡ PASSED (zero tolerancji)
- Zliczanie idealnych tygodni oraz idealnych tygodni z rzÄ™du

### System NagrĂłd
- Odblokowanie na podstawie:
  - Progu punktowego (np. 30, 60, 90 punktĂłw)
  - Passy (np. 7 dni z rzÄ™du)
  - Idealnych tygodni z rzÄ™du (np. 2 idealne tygodnie)
- PeĹ‚noekranowy komunikat po odblokowaniu
- OdbiĂłr u rodzica (przycisk "Wydano")
- Historia nagrĂłd (unlockedAt, claimedAt)

### Cel Rodzinny
- WspĂłlny cel dla caĹ‚ej rodziny
- Pasek postÄ™pu na podstawie sumy punktĂłw
- Konfigurowalny przez rodzica

## đźŽ¨ Design

### Estetyka Glassmorphism
- Przezroczyste karty z efektem rozmycia (backdrop-filter)
- Gradienty i cienie
- Nowoczesne fonty (Outfit)
- Responsywny design

### Animacje
- Fade-in dla widokĂłw
- Hover effects na kartach
- Konfetti przy odblokowaniu nagrĂłd
- Efekty dĹşwiÄ™kowe przy zatwierdzaniu

## đź“± Widoki Aplikacji

### 1. Ekran Startowy (Home)
- WybĂłr profilu dziecka (kafelki z awatarem)
- Przycisk do rankingu
- Pasek postÄ™pu celu rodzinnego
- Ukryty dostÄ™p do panelu admina (dĹ‚ugie przytrzymanie logo)

### 2. Panel Dziecka
- Status dzisiejszego dnia (PASSED/FAILED/N/A)
- Statystyki: passa, punkty, idealne tygodnie
- Lista dzisiejszych zadaĹ„ do odznaczenia
- Kalendarz ostatnich 30 dni
- Lista odblokowanych nagrĂłd

### 3. Panel Administratora (PIN: 1234)
ZakĹ‚adki:
- **Do zatwierdzenia**: Zadania czekajÄ…ce na akceptacjÄ™
- **Dzieci**: Statystyki i zarzÄ…dzanie profilami
- **Nagrody**: Odblokowane nagrody do wydania (przycisk "Wydano")

### 4. Ranking (Leaderboard)
Sortowanie wedĹ‚ug:
1. Idealnych tygodni z rzÄ™du
2. Passy (streak)
3. PunktĂłw

## đź”§ Technologia

### Stack Technologiczny
- **Frontend**: React 18 (przez CDN)
- **Stylizacja**: CSS-in-JS + custom CSS
- **Fonty**: Outfit (Google Fonts)
- **Animacje**: Canvas Confetti, Web Audio API
- **Data**: date-fns (przez CDN)
- **Storage**: localStorage
- **PWA**: Service Worker + manifest.json

### Architektura
- Single Page Application (SPA)
- Komponenty funkcyjne z hooks
- State management przez useState
- localStorage jako baza danych
- Czysty JavaScript (Babel dla JSX)

## đź§Ş Test Cases - Walidacja Logiki

### A. Logika 100%/0% (bez procentĂłw)

#### Test 1: DzieĹ„ aktywny, czÄ™Ĺ›ciowe wykonanie MIN
**Scenariusz**: 
- DzieĹ„ aktywny, 3 zadania MIN
- Zatwierdzone 2/3 zadania MIN

**Oczekiwany rezultat**:
- Status dnia: FAILED
- Punkty za dzieĹ„: 0
- Passa: 0 (lub reset)
- UI nie pokazuje "66%" ani "prawie zaliczone"

#### Test 2: DzieĹ„ nieaktywny (N/A)
**Scenariusz**:
- DzieĹ„ nieaktywny (np. sobota gdy aktywne sÄ… Pn-Pt)
- Jakiekolwiek zadania

**Oczekiwany rezultat**:
- Status dnia: N/A
- Passa NIE jest resetowana
- PrzykĹ‚ad: Pt PASSED, Sob N/A, Nd N/A, Pn PASSED â†’ passa kontynuuje

### B. Przyznawanie punktĂłw tylko za PASSED dzieĹ„

#### Test 3: Zmiana dnia z FAILED na PASSED
**Scenariusz**:
- DzieĹ„ poczÄ…tkowo FAILED (2/3 MIN)
- Rodzic zatwierdza ostatni MIN

**Oczekiwany rezultat**:
- Status dnia zmienia siÄ™ na PASSED
- Natychmiast przyznawane POINTS_PER_PASSED_DAY (+5)
- Wpis w pointsLedger typu "day_passed"
- Konfetti + dĹşwiÄ™k sukcesu

#### Test 4: Anty-dublowanie punktĂłw
**Scenariusz**:
- DzieĹ„ juĹĽ PASSED
- UĹĽytkownik odĹ›wieĹĽa stronÄ™ / wchodzi ponownie
- Rodzic klika wielokrotnie

**Oczekiwany rezultat**:
- Punkty przyznane tylko raz
- dayPointsGranted[date] = true zapobiega duplikatom
- Total points nie zwiÄ™ksza siÄ™ ponownie

#### Test 5: Brak punktĂłw za samo oznaczenie zadania
**Scenariusz**:
- Dziecko oznacza MIN jako doneByChild=true
- Brak akceptacji rodzica

**Oczekiwany rezultat**:
- 0 punktĂłw
- Status dnia pozostaje FAILED
- Zadanie widoczne w kolejce do zatwierdzenia

### C. Passa (streak) - twarda logika

#### Test 6: Passa roĹ›nie tylko od PASSED dni aktywnych
**Scenariusz**:
- Pn PASSED
- Wt PASSED
- Ĺšr FAILED
- Czw PASSED

**Oczekiwany rezultat**:
- Po Pn: streak = 1
- Po Wt: streak = 2
- Po Ĺšr: streak = 0 (reset)
- Po Czw: streak = 1
- Nie wolno liczyÄ‡ doneByChild ani N/A

#### Test 7: Dni nieaktywne nie resetujÄ… passy
**Scenariusz**:
- Pt PASSED (streak=3)
- Sob N/A
- Nd N/A
- Pn PASSED

**Oczekiwany rezultat**:
- Streak po Pn: 4
- N/A nie przerywa ciÄ…gĹ‚oĹ›ci

### D. Idealny tydzieĹ„ (0/1) i bonus

#### Test 8: Idealny tydzieĹ„ = 100% aktywnych PASSED
**Scenariusz**:
- Aktywne dni: Pn-Pt
- 1 dzieĹ„ z tygodnia FAILED

**Oczekiwany rezultat**:
- TydzieĹ„ NIE jest idealny
- Brak bonusu IDEAL_WEEK
- Nie wolno "prawie idealny"

#### Test 9: Bonus IDEAL_WEEK przyznawany raz
**Scenariusz**:
- Wszystkie dni Pn-Pt PASSED
- TydzieĹ„ staje siÄ™ IDEAL

**Oczekiwany rezultat**:
- Bonus +20 punktĂłw przyznany raz
- weekBonusGranted[weekStart] = true
- OdĹ›wieĹĽenie nie dodaje bonusu ponownie

### E. Odblokowanie nagrĂłd

#### Test 10: Nagroda progowa punktĂłw
**Scenariusz**:
- pointsTotal przekracza prĂłg (np. 30)

**Oczekiwany rezultat**:
- Nagroda odblokowana dokĹ‚adnie raz
- PeĹ‚noekranowy modal z komunikatem
- Konfetti + dĹşwiÄ™k
- Nagroda w unlockedRewards
- Rodzic moĹĽe kliknÄ…Ä‡ "Wydano"

#### Test 11: Nagroda za passÄ™ / idealne tygodnie
**Scenariusz**:
- Wymaganie: streakDays >= 7
- LUB idealWeeksInRow >= 2

**Oczekiwany rezultat**:
- Odblokowanie dopiero przy osiÄ…gniÄ™ciu warunku
- Nie wolno "1.5 tygodnia" ani przybliĹĽenia
- Twarde 0/1

### F. Reset dzienny / zmiana daty

#### Test 12: Nowy dzieĹ„
**Scenariusz**:
- Zmiana daty na nastÄ™pny dzieĹ„

**Oczekiwany rezultat**:
- Nowa struktura statusu dnia
- Ocena poprzedniego dnia zachowana
- DzieĹ„ FAILED moĹĽe przejĹ›Ä‡ na PASSED jeĹ›li rodzic uzupeĹ‚ni
- Punkty nadal tylko raz za dzieĹ„

### G. ZgodnoĹ›Ä‡ UI

#### Test 13: UI bez procentĂłw
**Oczekiwany rezultat**:
- Panel dziecka pokazuje tylko PASSED/FAILED/N/A
- Brak komunikatĂłw "90% w tym tygodniu"
- Tylko passa, punkty, idealne tygodnie

#### Test 14: Kolejka do akceptacji
**Oczekiwany rezultat**:
- Admin widzi zadania doneByChild=true i approvedByParent=false
- Zatwierdzenie aktualizuje status dnia
- Ewentualne przyznanie punktĂłw

## đź“‹ Dane Startowe

Przy pierwszym uruchomieniu (pusta localStorage):
- 2 przykĹ‚adowe profile dzieci (Leo đź¦, Mia đź¦„)
- Dni aktywne: Pn-Pt
- 6 przykĹ‚adowych zadaĹ„ (MIN i PLUS)
- 5 przykĹ‚adowych nagrĂłd (progi: 30, 60, 90 punktĂłw, passa 7, idealne tygodnie 2)
- Cel rodzinny: "WyjĹ›cie na pizzÄ™" (200 punktĂłw)

## đźš€ Uruchomienie

### Opcja 1: BezpoĹ›rednio w przeglÄ…darce
1. OtwĂłrz plik `family-manager.html` w przeglÄ…darce
2. Aplikacja dziaĹ‚a bez serwera (wszystkie zaleĹĽnoĹ›ci z CDN)

### Opcja 2: Z serwerem lokalnym
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

### Opcja 3: PWA Installation
1. OtwĂłrz w Chrome/Edge/Safari
2. Kliknij ikonÄ™ instalacji w pasku adresu
3. Aplikacja dziaĹ‚a offline

## đź” DostÄ™p Administratora

- Metoda: DĹ‚ugie przytrzymanie logo đźŹ  (2 sekundy)
- PIN: **1234**
- PIN mozesz zmienic w: `Panel Administratora -> Ustawienia -> Parametry Punktow`

## đź“Š Struktura Danych (localStorage)

```javascript
{
  children: [{
    id, name, avatar,
    activeDays: [1,2,3,4,5], // Pn-Pt
    pointsTotal, pointsLedger,
    streakDays, idealWeeks, idealWeeksInRow,
    unlockedRewards, dayPointsGranted, weekBonusGranted
  }],
  tasks: [{ id, childId, name, tier, points }],
  completions: [{ id, childId, taskId, date, doneByChild, approvedByParent }],
  rewards: [{ id, name, pointsThreshold, streakThreshold, idealWeeksThreshold }],
  familyGoal: { name, threshold, type }
}
```

## đźŽŻ Kluczowe Funkcje Logiki

### `evaluateDay(childData, date, completions, tasks)`
Zwraca status dnia: 'PASSED' | 'FAILED' | 'N/A'

### `grantDayPointsIfNeeded(childData, date, dayStatus, updateChild)`
Przyznaje punkty za PASSED dzieĹ„ (z anty-dublowaniem)

### `calculateStreak(childData, today, completions, tasks)`
Oblicza passÄ™ (kolejne dni PASSED)

### `evaluateWeek(childData, weekStart, completions, tasks, updateChild)`
Sprawdza czy tydzieĹ„ jest IDEAL i przyznaje bonus

### `calculateIdealWeeksInRow(childData, today, completions, tasks)`
Oblicza idealne tygodnie z rzÄ™du

### `checkRewards(childData, rewards, updateChild, showRewardModal)`
Sprawdza warunki i odblokowuje nagrody

## đźŽ¨ Customizacja

### Kolory
Edytuj zmienne CSS w sekcji `:root`:
```css
--primary: #6366f1;
--secondary: #ec4899;
--success: #10b981;
--background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Punkty i PIN
Nie trzeba juz edytowac kodu.
W aplikacji przejdz do:
`Panel Administratora -> Ustawienia -> Parametry Punktow`
i zapisz zmiany.

## đź“± ResponsywnoĹ›Ä‡

- Desktop: Full layout z kartami
- Tablet: Grid dostosowany
- Mobile: Single column, dotyk

## đź”Š Funkcje Multimedialne

- **DĹşwiÄ™k sukcesu**: Web Audio API (generowany ton)
- **Konfetti**: Canvas Confetti library
- **Animacje**: CSS transitions + keyframes

## đźŚ KompatybilnoĹ›Ä‡

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## đź“ť Licencja

Open source - moĹĽesz swobodnie modyfikowaÄ‡ i dostosowywaÄ‡.

## đź¤ť Wsparcie

Aplikacja jest w peĹ‚ni funkcjonalna i gotowa do uĹĽycia.
Wszystkie test cases zostaĹ‚y zaimplementowane zgodnie z wymaganiami.

## âś… Status Implementacji

- âś… System 100%/0% (PASSED/FAILED/N/A)
- âś… Punkty tylko za PASSED dzieĹ„ (Opcja C)
- âś… Anty-dublowanie punktĂłw
- âś… Passa (streak) z ignorowaniem N/A
- âś… Idealny tydzieĹ„ (0/1)
- âś… Bonus za idealny tydzieĹ„
- âś… System nagrĂłd (progi + odblokowanie)
- âś… Cel rodzinny
- âś… Panel dziecka (bez procentĂłw)
- âś… Panel admina (kolejka zatwierdzeĹ„)
- âś… Ranking (idealne tygodnie â†’ passa â†’ punkty)
- âś… Glassmorphism design
- âś… PWA support
- âś… Animacje i dĹşwiÄ™ki
- âś… Wszystkie test cases

---

**Wersja**: 1.0.0  
**Data**: 2025-02-08  
**Autor**: Claude AI + Anthropic

## Railway Deploy

Projekt jest przygotowany do deployu na Railway jako aplikacja Node serwujaca statyczne pliki.

### Pliki deployowe
- `package.json` (start: `npm start`)
- `server.js` (serwer statyczny, healthcheck `/health`)
- `railway.json` (start command + healthcheck)
- `.railwayignore` (ograniczenie kontekstu deployu)

### Kroki
1. Wrzuc repo na GitHub.
2. W Railway utworz `New Project` -> `Deploy from GitHub repo`.
3. Wybierz to repo.
4. Railway automatycznie wykryje Node i uruchomi `npm start`.
5. Po deployu otworz wygenerowany adres.

### Lokalny test przed deployem
```bash
npm start
```
Nastepnie otworz `http://localhost:3000`.

## Konfiguracja punktow i PIN

Nie trzeba juz edytowac kodu HTML, zeby zmienic:
- punkty za zaliczony dzien,
- bonus za idealny tydzien,
- PIN administratora.

Zmienisz to w aplikacji: `Panel Administratora -> Ustawienia -> Parametry Punktow`, a potem `Zapisz Ustawienia`.


