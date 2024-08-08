> Développement en cours...

# Proto IPSUM App

À la recherche de l'harmonie.

## Déscription

Le projet a pour but de créer un dashboard personnel sur-mesure.

```diff
- text in red
+ text in green
! text in orange
# text in gray
@@ text in purple (and bold)@@
```
## Git
### Convention de nommage
```
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```
Types de commit les plus courants :

feat: Pour une nouvelle fonctionnalité
fix: Pour une correction de bug
docs: Pour des changements dans la documentation
style: Pour des changements de formatage (espaces, points-virgules, etc.)
refactor: Pour une refactorisation du code
test: Pour l'ajout ou la modification de tests
chore: Pour des tâches de maintenance
Étendue (scope) : Elle est optionnelle et permet de préciser la partie du projet concernée par le commit, par exemple feat(auth): pour une fonctionnalité liée à l'authentification.

Description : Une courte description du changement, généralement en moins de 50 caractères.

Corps du message (optionnel) : Pour fournir plus de contexte ou d'explications sur le changement.

Pied de page (optionnel) : Pour référencer des issues ou ajouter des métadonnées.

Exemple :
```
feat(user): add user registration form
```
```
fix(api): correct HTTP status code for authentication error
```
```
docs(readme): update installation instructions
```
```
refactor(database): optimize query for user search
```
```
fix(api): resolve data leak in user profile endpoint

A security vulnerability was discovered where private user data was
exposed through the public API. This commit:
- Adds proper authorization checks to the user profile endpoint
- Filters out sensitive information from the API response
- Adds unit and integration tests to prevent future regressions

BREAKING CHANGE: The response format of the user profile API has changed.
Clients will need to update their parsing logic.

Fixes #456
```