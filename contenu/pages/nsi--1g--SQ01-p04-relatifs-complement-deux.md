---
type: support
format: slides
annee: 2026-2027
groupe: 1g
matiere: NSI
publie: true
sequence: SQ01
parties: [P04]
support: projection
composant: Markdown
title: "Écrire les nombres négatifs"
subtitle: "Entiers relatifs et complément à 2 sur 8 bits"
niveau: "Première NSI"
theme: "Représentation des données"
auteur: "Stanis Humez"
date: 2026-11-16
competences: ["Représentation des données — représentation binaire d'un entier relatif en complément à 2"]
ia: interdite
---

::: {.slide .title}

## Entiers relatifs et complément à 2 sur 8 bits

![Motif de couverture](/nsi/1g/assets/complement-deux.svg)
:::

::: {.slide .concept}
# Objectifs

- **Délimiter** les valeurs qu'un entier signé sur 8 bits peut contenir.
- **Écrire et lire** un entier négatif en complément à 2.
- **Repérer** un dépassement d'un entier signé.

**Prérequis :** octet, poids des bits, addition binaire et dépassement sur 8 bits.
:::

::: {.slide .concept}
# Le problème : il faut aussi écrire les dettes

Une température, une altitude ou le résultat d'une soustraction peut être négatif.

Avec huit bits, il n'y a toujours que **256 écritures possibles**. Comment y loger les
nombres négatifs sans inventer une seconde machine à calculer ?
:::

::: {.slide .diagram}
# Un octet signé

![](/nsi/1g/assets/complement-deux.svg)

Le bit de gauche permet d'identifier une écriture négative, mais tous les bits restent
nécessaires pour effectuer les additions.
:::

::: {.slide .definition}
# L'intervalle à connaître

Sur *n* bits en complément à 2 : de **−2ⁿ⁻¹** à **2ⁿ⁻¹ − 1**.

| Taille | Entier non signé | Entier signé |
|---:|---:|---:|
| 4 bits | 0 à 15 | −8 à 7 |
| 8 bits | 0 à 255 | **−128 à 127** |
| 16 bits | 0 à 65 535 | −32 768 à 32 767 |

Il y a un négatif de plus : −128 est représentable, +128 ne l'est pas sur 8 bits.
:::

::: {.slide .concept layout="split"}
# Fabriquer −5

1. Écrire +5 : `00000101`
2. Inverser : `11111010`
3. Ajouter 1 : `11111011`

Donc **−5** s'écrit `11111011` sur 8 bits.

L'addition de +5 et −5 laisse `00000000` après avoir écarté la retenue de gauche.
:::

::: {.slide .concept layout="split"}
# Lire `11111011`

Le bit de gauche vaut 1 : le nombre est négatif.

1. Inverser : `00000100`
2. Ajouter 1 : `00000101`
3. Lire +5, donc le résultat est **−5**.

Cas à mémoriser : `10000000` = **−128**.
:::

::: {.slide .activity}
# Exercice 4.1 — Lire et écrire

**Papier · seul · 15 min**

**À produire :** les valeurs de `00010110`, `11111011`, `10000000`, puis les écritures de
+5, −5, −42 et −128 sur huit bits. Pour −42, montrer les trois étapes.

Vérifier ensuite avec la personne de votre choix, sans remplacer votre propre travail.
:::

::: {.slide .warning}
# Quand le résultat ne tient plus

```text
  01111000   = 120
+ 00010100   =  20
-----------
  10001100   = −116 sur 8 bits signés
```

120 + 20 vaut 140 : il est hors de l'intervalle −128 à 127. Deux nombres de même signe
qui donnent un résultat de signe opposé signalent un **dépassement signé**.
:::

::: {.slide .activity}
# Exercice 4.2 — Prévoir avant de calculer

**Papier · seul · 15 min**

**À produire :** pour 50 + 60, 120 + 20, −40 + −100 et −40 + 70 :

1. dire si le résultat tient sur 8 bits signés ;
2. faire l'addition binaire ;
3. interpréter les huit bits conservés.
:::

::: {.slide .summary}
# À retenir

1. Sur 8 bits signés : de **−128 à 127**.
2. Pour écrire −*N* : écrire *N*, inverser les bits, ajouter 1.
3. Pour lire un négatif : inverser, ajouter 1, puis placer le signe moins.
4. Un résultat hors intervalle est un dépassement, même si huit bits restent affichés.
:::
