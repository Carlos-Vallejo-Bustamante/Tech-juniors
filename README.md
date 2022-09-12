# TECH JUNIORS APP

## Endpoints

| HTTP Method   | URI path	          | Description                                       |
| ------------- |:-------------------:| -------------------------------------------------:|
| GET           | /                   | Homepage                                          |
| GET           | /jobs               | List of all jobs                                  |
| GET           | /sign-up            | Create form for new users                         |
| POST          | /sign-up            | Save the data of new users                        |
| GET           | /job/create         | Create form for new job offer                     |
| POST          | /job/create         | Save the info of one new job offer                |
| GET           | /job/:id            | Shows job offer info from ID detected             |
| GET           | /job/:id/edit       | Edit form for job offer Id detected               |
| POST          | /job/:id/edit       | Replace new info for offer job ID detected        |
| GET           | /company/:id        | Shows company info from ID detected               |
| GET           | /company/:id/edit   | Edit form for company role                        |
| POST          | /company/:id/edit   | Replace new info for company role ID detected     |
| GET           | /profile            | Shows user info of current session                |
| GET           | /profile/:id/edit   | Edit form for user role session on own ID         |
| POST          | /profile/:id/edit   | Replace new info for user role session on own ID  |

## JSON response format

```json
{
    "slug": "kuchenhilfe-fur-die-essensausgabe-in-teilzeit-st-josefskrankenhaus-freiburg-freiburg-im-breisgau-germany-150902",
    "company_name": "St. Josefskrankenhaus Freiburg",
    "title": "Küchenhilfe (m/w/d) für die Essensausgabe in Teilzeit",
    "description": "<strong>Company Description</strong><br><p>Im wunderschön, zentral gelegenen St. Josefskrankenhaus im Herzen Freiburgs, verfolgen wir die Vision, die fortschreitende medizinische Spezialisierung mit menschlicher Zuwendung und langjähriger Tradition zu verbinden. Im Dienste der Gesundheit eines jeden Menschen sind wir im Freiburger Raum eine primäre Anlaufstelle für die medizinische Versorgung aller Generationen. Mit viel Weitblick wird das inhaltliche Spektrum des Hauses kontinuierlich weiter ausgebaut – ohne dabei die jahrhundertealte Tradition der christlichen Zuwendung aus den Augen zu verlieren. Im Oktober 2020 ging das St. Josefskrankenhaus Freiburg in die Trägerschaft der Artemed Klinikgruppe über.</p><p><em>Unsere Philosophie ist eine wertschätzende und teamorientierte Unternehmenskultur mit flachen Hierarchien und kurzen Entscheidungswegen.</em></p><p>Haben Sie Lust Teil unseres Teams zu werden? Wir suchen Sie als</p><p><strong>Küchenhilfe (m/w/d) </strong></p><p>für<strong> </strong>die Essenausgabe im Personalcasino<strong> </strong>zum schnellstmöglichen Zeitpunkt in Teilzeit.</p><br><strong>Job Description</strong><br><p>Die Stelle umfasst eine tägliche Arbeitszeit von Mo.-Fr. von 8:30 – 14:45 Uhr.</p><p>Ihr Aufgabengebiet umfasst:</p><p><strong>8:30 Uhr bis 10:45 Uhr</strong></p><p>Mithilfe in der Produktion, Kalte Küche, Salate und Desserts herstellen und portionieren oder:</p><p>Anrichten von Speisen bei der Essensausgabe für die Patienten</p><p>&#xa0;</p><p><strong>Von 10:45 Uhr bis 14:45 Uhr</strong></p><p>Selbständige Essensausgabe für die Mitarbeiter im Personalcasino</p><p>inklusiver Vorbereitungs- und Abräumarbeiten</p><br><strong>Qualifications</strong><br><p>-&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; Selbstständiges und sauberes Arbeiten</p><p>-&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; Hohe Einsatzbereitschaft</p><p>-&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; Verantwortungsbewusstsein und Zuverlässigkeit</p><p>-&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; Idealerweise Vorkenntnisse in der Gemeinschaftsverpflegung</p><p>-&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; Belehrung nach §43 Infektionsschutzgesetz</p><p>&#xa0;</p><br><strong>Additional Information</strong><br><p><strong>Auf was können Sie sich freuen?</strong></p><p>-&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; Eine strukturierte und gewissenhafte Einarbeitung</p><p>-&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; Ein interessantes und abwechslungsreiches Aufgabengebiet</p><p>-&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; Kollegiale Zusammenarbeit in einem eingespielten Team</p><p>-&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; Eine moderne und hochwertige Arbeitsausstattung in klimatisierten Räumen</p><p>-&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; Faire Gehaltszahlung inkl. Jobticket</p><p>Sie haben Ideen und möchten sich gerne aktiv einbringen? Sie möchten in einem dynamischen Umfeld vielseitige Aufgaben übernehmen? Für Rückfragen steht Ihnen Herr Hanser unter der Durchwahl 0761 2711-5338 oder per E-Mail <a ---------- gerne zur Verfügung.</p><p>Wir freuen uns auf Ihre Bewerbung!</p><p>Ihre Bewerbung übermitteln Sie bitte online oder postalisch an:</p><p><strong>Artemed St. Josefskrankenhaus</strong><br><strong>– Geschäftsbereich Personal –</strong><br><strong>Sautierstraße 1,&#xa0;79104 Freiburg</strong></p>",
    "remote": false,
    "url": "https://www.arbeitnow.com/view/kuchenhilfe-fur-die-essensausgabe-in-teilzeit-st-josefskrankenhaus-freiburg-freiburg-im-breisgau-germany-150902",
    "tags": [
        "Hospital and health care",
        "health care provider"
    ],
    "job_types": [
        "Associate",
        "part time"
    ],
    "location": "Freiburg im Breisgau",
    "created_at": 1662828726
},
```

## JSON response data types
| Property 	     | Data type      	| 
|----------------|------------------|
| `title`        | String           | 
| `company`      | String           | 
| `description`  | String           | 
| `salary`       | String           | 
| `location`     | String           | 
| `remote`       | Boolean          | 
| `link`         | String           | 
