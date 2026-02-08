# Family Manager - System Zarządzania Rodziną

## 🎯 Opis Projektu

Family Manager to nowoczesna aplikacja webowa typu PWA (Progressive Web App) do zarządzania zadaniami i nagrodami dla dzieci. System oparty jest na filozofii 100%/0% - dzień jest albo zaliczony (PASSED) albo niezaliczony (FAILED), bez procentów i półśrodków.

## ✨ Kluczowe Funkcje

### System 100%/0%
- **PASSED**: Dzień aktywny z wszystkimi zadaniami MIN zatwierdzonymi
- **FAILED**: Dzień aktywny z przynajmniej jednym niezatwierdzonym zadaniem MIN
- **N/A**: Dzień nieaktywny (nie wpływa na passę)

### Mechanika Punktów (Opcja C)
- Punkty przyznawane **TYLKO** za zaliczony dzień (PASSED)
- Domyślnie: 5 punktów za dzień PASSED
- Anty-dublowanie: punkty za ten sam dzień tylko raz
- Brak punktów za pojedyncze zadania
- Bonus za idealny tydzień: 20 punktów (opcjonalny)

### System Zadań
- **MIN (⭐ Minimum)**: Zadania obowiązkowe - decydują o zaliczeniu dnia
- **PLUS (💎 Bonus)**: Zadania opcjonalne - nie wpływają na zaliczenie
- **WEEKLY (🏆 Tygodniowe)**: Zadania tygodniowe - nie wpływają na zaliczenie

### Passa (Streak)
- Liczba kolejnych dni aktywnych ze statusem PASSED
- Dni N/A nie przerywają passy
- Reset do 0 przy pierwszym FAILED

### Idealny Tydzień
- Tydzień jest IDEAL gdy wszystkie dni aktywne mają status PASSED
- Wymóg: 100% dni aktywnych musi być PASSED (zero tolerancji)
- Zliczanie idealnych tygodni oraz idealnych tygodni z rzędu

### System Nagród
- Odblokowanie na podstawie:
  - Progu punktowego (np. 30, 60, 90 punktów)
  - Passy (np. 7 dni z rzędu)
  - Idealnych tygodni z rzędu (np. 2 idealne tygodnie)
- Pełnoekranowy komunikat po odblokowaniu
- Odbiór u rodzica (przycisk "Wydano")
- Historia nagród (unlockedAt, claimedAt)

### Cel Rodzinny
- Wspólny cel dla całej rodziny
- Pasek postępu na podstawie sumy punktów
- Konfigurowalny przez rodzica

## 🎨 Design

### Estetyka Glassmorphism
- Przezroczyste karty z efektem rozmycia (backdrop-filter)
- Gradienty i cienie
- Nowoczesne fonty (Outfit)
- Responsywny design

### Animacje
- Fade-in dla widoków
- Hover effects na kartach
- Konfetti przy odblokowaniu nagród
- Efekty dźwiękowe przy zatwierdzaniu

## 📱 Widoki Aplikacji

### 1. Ekran Startowy (Home)
- Wybór profilu dziecka (kafelki z awatarem)
- Przycisk do rankingu
- Pasek postępu celu rodzinnego
- Ukryty dostęp do panelu admina (długie przytrzymanie logo)

### 2. Panel Dziecka
- Status dzisiejszego dnia (PASSED/FAILED/N/A)
- Statystyki: passa, punkty, idealne tygodnie
- Lista dzisiejszych zadań do odznaczenia
- Kalendarz ostatnich 30 dni
- Lista odblokowanych nagród

### 3. Panel Administratora (PIN: 1234)
Zakładki:
- **Do zatwierdzenia**: Zadania czekające na akceptację
- **Dzieci**: Statystyki i zarządzanie profilami
- **Nagrody**: Odblokowane nagrody do wydania (przycisk "Wydano")

### 4. Ranking (Leaderboard)
Sortowanie według:
1. Idealnych tygodni z rzędu
2. Passy (streak)
3. Punktów

## 🔧 Technologia

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

## 🧪 Test Cases - Walidacja Logiki

### A. Logika 100%/0% (bez procentów)

#### Test 1: Dzień aktywny, częściowe wykonanie MIN
**Scenariusz**: 
- Dzień aktywny, 3 zadania MIN
- Zatwierdzone 2/3 zadania MIN

**Oczekiwany rezultat**:
- Status dnia: FAILED
- Punkty za dzień: 0
- Passa: 0 (lub reset)
- UI nie pokazuje "66%" ani "prawie zaliczone"

#### Test 2: Dzień nieaktywny (N/A)
**Scenariusz**:
- Dzień nieaktywny (np. sobota gdy aktywne są Pn-Pt)
- Jakiekolwiek zadania

**Oczekiwany rezultat**:
- Status dnia: N/A
- Passa NIE jest resetowana
- Przykład: Pt PASSED, Sob N/A, Nd N/A, Pn PASSED → passa kontynuuje

### B. Przyznawanie punktów tylko za PASSED dzień

#### Test 3: Zmiana dnia z FAILED na PASSED
**Scenariusz**:
- Dzień początkowo FAILED (2/3 MIN)
- Rodzic zatwierdza ostatni MIN

**Oczekiwany rezultat**:
- Status dnia zmienia się na PASSED
- Natychmiast przyznawane POINTS_PER_PASSED_DAY (+5)
- Wpis w pointsLedger typu "day_passed"
- Konfetti + dźwięk sukcesu

#### Test 4: Anty-dublowanie punktów
**Scenariusz**:
- Dzień już PASSED
- Użytkownik odświeża stronę / wchodzi ponownie
- Rodzic klika wielokrotnie

**Oczekiwany rezultat**:
- Punkty przyznane tylko raz
- dayPointsGranted[date] = true zapobiega duplikatom
- Total points nie zwiększa się ponownie

#### Test 5: Brak punktów za samo oznaczenie zadania
**Scenariusz**:
- Dziecko oznacza MIN jako doneByChild=true
- Brak akceptacji rodzica

**Oczekiwany rezultat**:
- 0 punktów
- Status dnia pozostaje FAILED
- Zadanie widoczne w kolejce do zatwierdzenia

### C. Passa (streak) - twarda logika

#### Test 6: Passa rośnie tylko od PASSED dni aktywnych
**Scenariusz**:
- Pn PASSED
- Wt PASSED
- Śr FAILED
- Czw PASSED

**Oczekiwany rezultat**:
- Po Pn: streak = 1
- Po Wt: streak = 2
- Po Śr: streak = 0 (reset)
- Po Czw: streak = 1
- Nie wolno liczyć doneByChild ani N/A

#### Test 7: Dni nieaktywne nie resetują passy
**Scenariusz**:
- Pt PASSED (streak=3)
- Sob N/A
- Nd N/A
- Pn PASSED

**Oczekiwany rezultat**:
- Streak po Pn: 4
- N/A nie przerywa ciągłości

### D. Idealny tydzień (0/1) i bonus

#### Test 8: Idealny tydzień = 100% aktywnych PASSED
**Scenariusz**:
- Aktywne dni: Pn-Pt
- 1 dzień z tygodnia FAILED

**Oczekiwany rezultat**:
- Tydzień NIE jest idealny
- Brak bonusu IDEAL_WEEK
- Nie wolno "prawie idealny"

#### Test 9: Bonus IDEAL_WEEK przyznawany raz
**Scenariusz**:
- Wszystkie dni Pn-Pt PASSED
- Tydzień staje się IDEAL

**Oczekiwany rezultat**:
- Bonus +20 punktów przyznany raz
- weekBonusGranted[weekStart] = true
- Odświeżenie nie dodaje bonusu ponownie

### E. Odblokowanie nagród

#### Test 10: Nagroda progowa punktów
**Scenariusz**:
- pointsTotal przekracza próg (np. 30)

**Oczekiwany rezultat**:
- Nagroda odblokowana dokładnie raz
- Pełnoekranowy modal z komunikatem
- Konfetti + dźwięk
- Nagroda w unlockedRewards
- Rodzic może kliknąć "Wydano"

#### Test 11: Nagroda za passę / idealne tygodnie
**Scenariusz**:
- Wymaganie: streakDays >= 7
- LUB idealWeeksInRow >= 2

**Oczekiwany rezultat**:
- Odblokowanie dopiero przy osiągnięciu warunku
- Nie wolno "1.5 tygodnia" ani przybliżenia
- Twarde 0/1

### F. Reset dzienny / zmiana daty

#### Test 12: Nowy dzień
**Scenariusz**:
- Zmiana daty na następny dzień

**Oczekiwany rezultat**:
- Nowa struktura statusu dnia
- Ocena poprzedniego dnia zachowana
- Dzień FAILED może przejść na PASSED jeśli rodzic uzupełni
- Punkty nadal tylko raz za dzień

### G. Zgodność UI

#### Test 13: UI bez procentów
**Oczekiwany rezultat**:
- Panel dziecka pokazuje tylko PASSED/FAILED/N/A
- Brak komunikatów "90% w tym tygodniu"
- Tylko passa, punkty, idealne tygodnie

#### Test 14: Kolejka do akceptacji
**Oczekiwany rezultat**:
- Admin widzi zadania doneByChild=true i approvedByParent=false
- Zatwierdzenie aktualizuje status dnia
- Ewentualne przyznanie punktów

## 📋 Dane Startowe

Przy pierwszym uruchomieniu (pusta localStorage):
- 2 przykładowe profile dzieci (Leo 🦁, Mia 🦄)
- Dni aktywne: Pn-Pt
- 6 przykładowych zadań (MIN i PLUS)
- 5 przykładowych nagród (progi: 30, 60, 90 punktów, passa 7, idealne tygodnie 2)
- Cel rodzinny: "Wyjście na pizzę" (200 punktów)

## 🚀 Uruchomienie

### Opcja 1: Bezpośrednio w przeglądarce
1. Otwórz plik `family-manager.html` w przeglądarce
2. Aplikacja działa bez serwera (wszystkie zależności z CDN)

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
1. Otwórz w Chrome/Edge/Safari
2. Kliknij ikonę instalacji w pasku adresu
3. Aplikacja działa offline

## 🔐 Dostęp Administratora

- Metoda: Długie przytrzymanie logo 🏠 (2 sekundy)
- PIN: **1234**
- PIN mozesz zmienic w: `Panel Administratora -> Ustawienia -> Parametry Punktow`

## 📊 Struktura Danych (localStorage)

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

## 🎯 Kluczowe Funkcje Logiki

### `evaluateDay(childData, date, completions, tasks)`
Zwraca status dnia: 'PASSED' | 'FAILED' | 'N/A'

### `grantDayPointsIfNeeded(childData, date, dayStatus, updateChild)`
Przyznaje punkty za PASSED dzień (z anty-dublowaniem)

### `calculateStreak(childData, today, completions, tasks)`
Oblicza passę (kolejne dni PASSED)

### `evaluateWeek(childData, weekStart, completions, tasks, updateChild)`
Sprawdza czy tydzień jest IDEAL i przyznaje bonus

### `calculateIdealWeeksInRow(childData, today, completions, tasks)`
Oblicza idealne tygodnie z rzędu

### `checkRewards(childData, rewards, updateChild, showRewardModal)`
Sprawdza warunki i odblokowuje nagrody

## 🎨 Customizacja

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

## 📱 Responsywność

- Desktop: Full layout z kartami
- Tablet: Grid dostosowany
- Mobile: Single column, dotyk

## 🔊 Funkcje Multimedialne

- **Dźwięk sukcesu**: Web Audio API (generowany ton)
- **Konfetti**: Canvas Confetti library
- **Animacje**: CSS transitions + keyframes

## 🌐 Kompatybilność

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## 📝 Licencja

Open source - możesz swobodnie modyfikować i dostosowywać.

## 🤝 Wsparcie

Aplikacja jest w pełni funkcjonalna i gotowa do użycia.
Wszystkie test cases zostały zaimplementowane zgodnie z wymaganiami.

## ✅ Status Implementacji

- ✅ System 100%/0% (PASSED/FAILED/N/A)
- ✅ Punkty tylko za PASSED dzień (Opcja C)
- ✅ Anty-dublowanie punktów
- ✅ Passa (streak) z ignorowaniem N/A
- ✅ Idealny tydzień (0/1)
- ✅ Bonus za idealny tydzień
- ✅ System nagród (progi + odblokowanie)
- ✅ Cel rodzinny
- ✅ Panel dziecka (bez procentów)
- ✅ Panel admina (kolejka zatwierdzeń)
- ✅ Ranking (idealne tygodnie → passa → punkty)
- ✅ Glassmorphism design
- ✅ PWA support
- ✅ Animacje i dźwięki
- ✅ Wszystkie test cases

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



