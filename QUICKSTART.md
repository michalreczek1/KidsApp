# đźš€ Szybki Start - Family Manager

## Instalacja i Uruchomienie

### Krok 1: OtwĂłrz aplikacjÄ™
Po prostu otwĂłrz plik `family-manager.html` w przeglÄ…darce (Chrome, Edge, Firefox, Safari).

**Aplikacja dziaĹ‚a bez instalacji serwera!** Wszystkie zaleĹĽnoĹ›ci sÄ… pobierane z CDN.

### Krok 2: Wybierz profil
Na ekranie startowym zobaczysz 2 przykĹ‚adowe profile:
- đź¦ Leo
- đź¦„ Mia

Kliknij na profil aby wejĹ›Ä‡ do panelu dziecka.

### Krok 3: Zaznaczaj zadania
Dziecko moĹĽe zaznaczaÄ‡ wykonane zadania klikajÄ…c checkbox.
Zadania oznaczone przez dziecko czekajÄ… na akceptacjÄ™ rodzica.

### Krok 4: DostÄ™p administratora
**Metoda 1 (Polecana)**:
1. Przytrzymaj logo đźŹ  przez 2 sekundy
2. Pojawi siÄ™ okno z proĹ›bÄ… o PIN
3. Wpisz: **1234**

**Metoda 2**:
MoĹĽesz zmieniÄ‡ kod aby pokazaÄ‡ przycisk admina bezpoĹ›rednio.

### Krok 5: ZatwierdĹş zadania (Admin)
W panelu administratora:
1. ZakĹ‚adka "Do zatwierdzenia"
2. Kliknij "âś“ ZatwierdĹş" przy kaĹĽdym zadaniu
3. System automatycznie:
   - Oceni czy dzieĹ„ jest PASSED
   - Przyzna punkty (jeĹ›li wszystkie MIN zatwierdzone)
   - Zaktualizuje passÄ™
   - Sprawdzi nagrody

## đź“± Instalacja jako PWA (Progressive Web App)

### Na Komputerze (Chrome/Edge):
1. OtwĂłrz `family-manager.html` w przeglÄ…darce
2. Kliknij ikonÄ™ instalacji w pasku adresu (âž• lub komputer)
3. Kliknij "Instaluj"
4. Aplikacja pojawi siÄ™ jako osobne okno

### Na iOS (iPhone/iPad):
1. OtwĂłrz w Safari
2. Kliknij przycisk "UdostÄ™pnij" (kwadrat ze strzaĹ‚kÄ…)
3. PrzewiĹ„ i wybierz "Dodaj do ekranu gĹ‚Ăłwnego"
4. Nadaj nazwÄ™ i kliknij "Dodaj"
5. Ikona đźŹ  pojawi siÄ™ na ekranie gĹ‚Ăłwnym

### Na Androidzie:
1. OtwĂłrz w Chrome
2. Menu (â‹®) â†’ "Dodaj do ekranu gĹ‚Ăłwnego"
3. PotwierdĹş
4. Ikona pojawi siÄ™ na ekranie gĹ‚Ăłwnym

## âšˇ Szybkie WskazĂłwki

### Dla Dzieci:
- **Zaznaczaj zadania** kaĹĽdego dnia
- **Sprawdzaj status dnia** - czy jest zaliczony (âś… PASSED)
- **Buduj passÄ™** - kolejne dni zaliczone
- **Odblokowuj nagrody** - zbieraj punkty i buduj idealne tygodnie

### Dla RodzicĂłw:
- **Zatwierdzaj zadania** kaĹĽdego dnia (zakĹ‚adka "Do zatwierdzenia")
- **Monitoruj postÄ™py** w zakĹ‚adce "Dzieci"
- **Wydawaj nagrody** w zakĹ‚adce "Nagrody" (przycisk "Wydano")
- **Dostosuj zadania** - edytuj w kodzie lub localStorage

## đźŽŻ Kluczowe Zasady

### System 100%/0%
- DzieĹ„ jest **ZALICZONY** gdy wszystkie zadania MIN sÄ… zatwierdzone
- DzieĹ„ jest **NIEZALICZONY** gdy choÄ‡ 1 MIN brakuje
- Dni nieaktywne (weekend) = **N/A** (nie liczÄ… siÄ™, nie przerywajÄ… passy)

### Punkty
- **5 punktĂłw** za kaĹĽdy zaliczony dzieĹ„
- **20 punktĂłw bonusu** za idealny tydzieĹ„ (wszystkie dni aktywne PASSED)
- Punkty przyznawane **tylko raz** za dzieĹ„ (anty-dublowanie)
- **Brak punktĂłw** za pojedyncze zadania

### Passa
- Liczba **kolejnych dni aktywnych** ze statusem PASSED
- Dni N/A **nie przerywajÄ…** passy
- FAILED **resetuje** passÄ™ do 0

### Nagrody
Odblokowanie gdy:
- Punkty osiÄ…gnÄ… prĂłg (np. 30, 60, 90)
- Passa osiÄ…gnie cel (np. 7 dni)
- Idealne tygodnie z rzÄ™du (np. 2)

## đź› ď¸Ź Dostosowywanie

### Zmien PIN administratora:
Wejdz do: `Panel Administratora -> Ustawienia -> Parametry Punktow`.
Wpisz nowy PIN (4-8 cyfr) i kliknij `Zapisz Ustawienia`.

### Zmien punkty:
W tym samym miejscu ustawisz:
- Punkty za zaliczony dzien
- Bonus za idealny tydzien

### Dodaj dziecko:
WejdĹş do localStorage w devtools lub edytuj kod w sekcji `getInitialData()`.

### ZmieĹ„ dni aktywne:
```javascript
activeDays: [1, 2, 3, 4, 5] // 1=Pn, 2=Wt, ..., 7=Nd
```

## đź”Ť Debugowanie

### SprawdĹş localStorage:
1. OtwĂłrz DevTools (F12)
2. ZakĹ‚adka "Application" â†’ "Local Storage"
3. ZnajdĹş klucz `familyManagerData`
4. MoĹĽesz edytowaÄ‡ JSON rÄ™cznie

### Reset danych:
W konsoli przeglÄ…darki:
```javascript
localStorage.removeItem('familyManagerData');
location.reload();
```

### SprawdĹş logi:
OtwĂłrz konsolÄ™ (F12) i sprawdĹş komunikaty.

## đź“Š PrzykĹ‚adowy Harmonogram

### DzieĹ„ 1 (PoniedziaĹ‚ek):
- Dziecko zaznacza wykonane zadania
- Rodzic zatwierdza wieczorem
- System przyznaje punkty jeĹ›li wszystkie MIN âś“
- Status dnia: PASSED â†’ Passa: 1

### DzieĹ„ 7 (Niedziela):
- N/A (dzieĹ„ nieaktywny)
- Passa nie resetuje siÄ™
- Brak punktĂłw (normalnie)

### TydzieĹ„ 2:
- Wszystkie dni Pn-Pt PASSED
- System wykrywa idealny tydzieĹ„
- Bonus +20 punktĂłw
- MoĹĽliwe odblokowanie nagrody

## âś… Checklist Pierwszego Uruchomienia

- [ ] OtwĂłrz `family-manager.html`
- [ ] Przetestuj wybĂłr profilu
- [ ] Zaznacz kilka zadaĹ„ jako dziecko
- [ ] Odblokuj panel admina (PIN: 1234)
- [ ] ZatwierdĹş zadania
- [ ] SprawdĹş czy punkty siÄ™ przyznaĹ‚y
- [ ] SprawdĹş passÄ™ i status dnia
- [ ] (Opcjonalnie) Zainstaluj jako PWA

## đź† Problemy?

### Aplikacja nie dziaĹ‚a:
- SprawdĹş czy masz poĹ‚Ä…czenie z internetem (CDN dla bibliotek)
- SprawdĹş konsolÄ™ przeglÄ…darki (F12)
- Upewnij siÄ™ ĹĽe uĹĽywasz nowoczesnej przeglÄ…darki

### Punkty siÄ™ nie przyznajÄ…:
- SprawdĹş czy **wszystkie** zadania MIN sÄ… zatwierdzone
- SprawdĹş czy dzieĹ„ jest aktywny (nie weekend jeĹ›li aktywne sÄ… Pn-Pt)
- SprawdĹş localStorage czy `dayPointsGranted` nie blokuje

### Passa siÄ™ resetuje:
- SprawdĹş czy ktĂłryĹ› z dni aktywnych nie byĹ‚ FAILED
- Dni N/A nie resetujÄ… passy

## đź“ž Wsparcie

Aplikacja jest open source i moĹĽna jÄ… dowolnie modyfikowaÄ‡.
Wszystkie funkcje sÄ… w jednym pliku HTML dla Ĺ‚atwoĹ›ci edycji.

---

**MiĹ‚ego korzystania z Family Manager! đźŹ âś¨**

## Railway (deploy w 5 minut)

1. Wrzuc projekt na GitHub.
2. W Railway kliknij `New Project` -> `Deploy from GitHub repo`.
3. Wybierz repo z tym projektem.
4. Railway uruchomi aplikacje komenda `npm start`.
5. Wejdz na URL z Railway.

Lokalny test deployu:
```bash
npm start
```
Otworz `http://localhost:3000`.

## WaĹĽne: punkty i PIN

Punkty za dzien, bonus tygodniowy i PIN admina zmieniasz teraz w aplikacji:
`Panel Administratora -> Ustawienia -> Parametry Punktow`.

