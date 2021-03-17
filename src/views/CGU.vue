<!-- VIEW : CGU -->
<template>
  <div class="cgu">
    <div class="nav">
      <a v-if="user.loggedIn" @click="goDashboard"><i class="material-icons">arrow_back</i></a>
      <a v-else @click="goHome"><i class="material-icons">arrow_back</i></a>
      <Hero title="Conditions générales d'utilisation"/>
    </div>
    <div class="cgu-text">
      <p class="center"><em>En vigueur au 01/01/2021</em></p>
      <p>
        Les présentes conditions générales d'utilisation (dites <strong>« CGU »</strong>) ont pour objet l'encadrement
        juridique des modalités de mise à disposition du site et des services par <strong>Tapitap</strong> et de définir
        les conditions d’accès et d’utilisation des services par <strong>« l'Utilisateur »</strong>.<br/>
        Les présentes CGU sont accessibles sur le site à la rubrique <strong>«CGU»</strong>.
      </p>
      <p>
        Toute inscription ou utilisation du site implique l'acceptation sans aucune réserve ni
        restriction des présentes CGU par l’utilisateur. Lors de l'inscription sur le site via le
        Formulaire d’inscription, chaque utilisateur accepte expressément les présentes CGU en
        cochant la case précédant le texte suivant : <em>« Je reconnais avoir lu et compris les CGU et je
        les accepte »</em>.
      </p>
      <p>
        En cas de non-acceptation des CGU stipulées dans le présent contrat, l'Utilisateur se doit de
        renoncer à l'accès des services proposés par le site.<br/>
        www.futureadresse.net se réserve le droit de modifier unilatéralement et à tout moment le
        contenu des présentes CGU.
      </p>

      <h1 class="center">ARTICLE 1 : Les mentions légales</h1>
      <p>
        L’édition et la direction de la publication du site www.futureadresse.net est assurée par
        Promotion IMAC 2021 - Spécialité Web, domicilié ESIPE - Bâtiment Copernic - 5 Blvd
        Descartes - 77420 Champs Sur Marnes.<br/>
        Numéro de téléphone est / <br/>
        Adresse e-mail tapitap.app@gmail.com
      </p>
      <p>
        L'hébergeur de l'application est la promotion 2021 spécialité Web IMAC de l'ESIPE-MLV,
        situé au Bâtiment Copernic - 5 Blvd Descartes - 77420 Champs sur Marne.
      </p>

      <h1 class="center">ARTICLE 2 : Accès au site</h1>
      <p>
        L'application Tapitap permet à l'Utilisateur un accès gratuit aux services suivants :<br/>
        Le site internet propose les services suivants :
      </p>
      <ul>
        <li>gérer sa liste de patients, et les information relatives aux patients</li>
        <li>faire passer des tests</li>
        <li>consulter les résultats des tests</li>
        <li>consulter les statistiques relatifs aux tests passés par les patients</li>
        <li>gérer ses informations personnelles</li>
      </ul>
      <p>
        Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet.
        Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique,
        logiciels, connexion Internet, etc.) sont à sa charge
      </p>
      <p>
        L’Utilisateur non membre n'a pas accès aux services réservés. Pour cela, il doit s’inscrire en
        remplissant le formulaire. En acceptant de s’inscrire aux services réservés, l’Utilisateur
        membre s’engage à fournir des informations sincères et exactes concernant son état civil et
        ses coordonnées, notamment son adresse email.<br/>
        Pour accéder aux services, l’Utilisateur doit ensuite s'identifier à l'aide de son identifiant et de
        son mot de passe qui lui seront communiqués après son inscription.
        Tout Utilisateur membre régulièrement inscrit pourra également solliciter sa désinscription en
        se rendant à la page dédiée sur son espace personnel. Celle-ci sera effective dans un délai
        raisonnable.<br/>
        Tout événement dû à un cas de force majeure ayant pour conséquence un
        dysfonctionnement du site ou serveur et sous réserve de toute interruption ou modification
        en cas de maintenance, n'engage pas la responsabilité de Tapitap. Dans ces cas,
        l’Utilisateur accepte ainsi ne pas tenir rigueur à l’éditeur de toute interruption ou suspension
        de service, même sans préavis.<br/>
        L'Utilisateur a la possibilité de contacter le site par messagerie électronique à l’adresse email
        de l’éditeur communiqué à l’ARTICLE 1.
      </p>

      <h1 class="center">ARTICLE 3 : Collecte des données</h1>
      <p>
        Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le
        respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à
        l'informatique, aux fichiers et aux libertés.<br/>
        En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose
        d'un droit d'accès, de rectification, de suppression et d'opposition de ses données
        personnelles. L'Utilisateur exerce ce droit :<br/>
        <br/>
        par mail à l'adresse mail <em>tapitap.app@gmail.com</em>
      </p>

      <h1 class="center">ARTICLE 4 : Propriété intellectuelle</h1>
      <p>
        Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font
        l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par
        le droit d'auteur.<br/>
        <br/>
        L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication,
        copie des différents contenus. Il s'engage à une utilisation des contenus du site dans un
        cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est
        strictement interdite.<br/>
        Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans
        l’autorisation expresse de l’exploitant du site Internet constituerait une contrefaçon
        sanctionnée par l’article L 335-2 et suivants du Code de la propriété intellectuelle.<br/>
        Il est rappelé conformément à l’article L122-5 du Code de propriété intellectuelle que
        l’Utilisateur qui reproduit, copie ou publie le contenu protégé doit citer l’auteur et sa source.
      </p>

      <h1 class="center">ARTICLE 5 : Responsabilité</h1>
      <p>
        Les sources des informations diffusées sur le site www.futureadresse.net sont réputées
        fiables mais le site ne garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.<br/>
        Les informations communiquées sont présentées à titre indicatif et général sans valeur
        contractuelle. Malgré des mises à jour régulières, l'application Tapitap ne peut être tenu
        responsable de la modification des dispositions administratives et juridiques survenant après
        la publication. De même, le site ne peut être tenue responsable de l’utilisation et de
        l’interprétation de l’information contenue dans ce site.
      </p>
      <p>
        L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation du mot de
        passe, quelle que soit sa forme, est interdite. Il assume les risques liés à l'utilisation de
        son identifiant et mot de passe. Le site décline toute responsabilité.
      </p>
      <p>
        L'application Tapitap ne peut être tenu pour responsable d’éventuels virus qui pourraient
        infecter l’ordinateur ou tout matériel informatique de l’Internaute, suite à une utilisation, à
        l’accès, ou au téléchargement provenant de ce site.<br/>
        La responsabilité du site ne peut être engagée en cas de force majeure ou du fait
        imprévisible et insurmontable d'un tiers.
      </p>

      <h1 class="center">ARTICLE 6 : Liens hypertextes</h1>
      <p>
        Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en
        cliquant sur ces liens, il sortira de l'application Tapitap. Ce dernier n’a pas de contrôle sur les
        pages web sur lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable
        de leur contenu.
      </p>

      <h1 class="center">ARTICLE 7 :  Droit applicable et juridiction compétente</h1>
      <p>
        La législation française s'applique au présent contrat. En cas d'absence de résolution
        amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents pour
        en connaître.<br/>
        Pour toute question relative à l’application des présentes CGU, vous pouvez joindre l’éditeur
        aux coordonnées inscrites à l’ARTICLE 1.
      </p>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import { mapGetters } from "vuex";

export default {
  name: 'CGU',
  components: {
    Hero
  },
  methods : {
    goHome(){
      if(this.$route.name != 'Home')
        this.$router.push({name:'Home'})
    },
    goDashboard() {
      if(this.$route.name != 'PatientsList')
        this.$router.push({name:'PatientsList'})
    }
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  }
}
</script>

<style scoped>
.cgu {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 400;
  position: relative;
  overflow: scroll;
}
.cgu a {
  position: absolute;
  top: 78px;
  left: 32px;
  font-size: 30px;
  cursor: pointer;
}
h1 {
  font-size: 1.6em;
  font-weight: 400;
  color: #382C50;
}
p {
  font-size: 1em;
  margin: 1rem auto;
}
.nav {
  margin-top: 50px;
}
.cgu-text {
  margin: 40px 10% 0 10%;
  text-align: justify;
}
.center {
  text-align: center;
}
</style>