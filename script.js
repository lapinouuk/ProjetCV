/*
---------------------------------------------------------------------------------------------------------

  SCRIPT MENU MOBILE - DEROULANT

---------------------------------------------------------------------------------------------------------
*/

$("#bouton_menu_mobile img").on("mouseover", function () {
  $("#bouton_menu_mobile img").attr('src', 'img/menu_mobile_active.png');
});

$("#bouton_menu_mobile img").on("mouseout", function () {
  $("#bouton_menu_mobile img").attr('src', 'img/menu_mobile.png');
});

var menuDeplier = 0;
/*
$(window).on("click", function() {
  $("#nav_mobile").css({'display':'none'});
  menuDeplier = 0;
});
*/

$("#bouton_menu_mobile").on("click", function (e) {
 /* e.stopPropagation(); */
  if (menuDeplier === 0) {
    $("#nav_mobile").css({'display':'flex'});
    menuDeplier = 1;
  } else {
    $("#nav_mobile").css({'display':'none'});
    menuDeplier = 0;
  };
});


/*
---------------------------------------------------------------------------------------------------------

	SCRIPT DEFILEMENT - BOUTON RETOUR & MENU MOBILE

---------------------------------------------------------------------------------------------------------
*/

function defile () {
  var scrollTop = window.pageYOffset;
  if (scrollTop > 50) {
    document.getElementById("retour").className = "visible";
    document.getElementById("top_head").style.height = "50px";
    $("#logo img").css({'height': '50px'});
    $("#nav_mobile").css({'top':'45px'});

  } else {
    document.getElementById("retour").className = "invisible";
    document.getElementById("top_head").style.height = "100px";
    $("#logo img").css({'height': '80px'});
    $("#nav_mobile").css({'top':'95px'});
  }
};

document.addEventListener("scroll", defile)


/*
---------------------------------------------------------------------------------------------------------

	SCRIPT APPARITION PROGRESSIVE

---------------------------------------------------------------------------------------------------------
*/


//Fonction pour faire apparaitre petit à petit un élement
function apparition(elt) {
  for (var i = 0; i < 1; i += 0.02) {
    (function(i) {
      setTimeout(function(){
        elt.style.opacity = i + "";
      }, 20*(50*i));
    })(i);
  };
}



/*
---------------------------------------------------------------------------------------------------------

	SCRIPT PANNEAU DEROULANT

---------------------------------------------------------------------------------------------------------
*/

//Paramètres pour la mise en place du panneau déroulant
var baniere = document.getElementById("top"),
    bouton = document.getElementById("boutonBanniere"),
    tailleDeplier = 260,
    taillePlier = 110;

//Paramètres pour l'apparition de la citation
var citationTitre = document.createElement("p"),
    citationText = document.createTextNode("\" L'intelligence, c'est la capacité de s'adapter aux changements.\""),
    citationAuteur = document.createElement("p"),
    citationAuteurText = document.createTextNode("S.W. Hawkings");


citationAuteur.appendChild(citationAuteurText);
citationTitre.appendChild(citationText);
citationTitre.appendChild(citationAuteur);
citationAuteur.id = "auteur";
citationTitre.id = "cit";



//Script pour l'agrandissement d'un panneau
bouton.addEventListener("click", function() {

  var tailleStg,
      tailleInt,
      baniereEvent = baniere;

  //Récupération des valeurs de la hauteur du panneau et passage en integer
  tailleStg = getComputedStyle(baniereEvent).height;
  tailleInt = parseInt(tailleStg, 10);
  var gamme = (tailleDeplier - taillePlier)/2

  //Si le panneau est deplier, alors on le replie
  if (baniereEvent.className === "bkgTrame deplier") {    

    for (var i = 0; i < gamme; i++) {
      // Closure
      (function(i) {
        setTimeout(function() {
          tailleInt += -2;
          var tailleSt = tailleInt + "px";
          baniereEvent.style.height = tailleSt;
        }, 10*i)
      })(i);
    };
    baniereEvent.removeChild(citationTitre);
    baniereEvent.className = "bkgTrame replier";
    
  //Si le panneau est replier, on le déplie
  } else if (baniereEvent.className === "bkgTrame replier"){

    for (var i = 0; i < gamme; i++) {
      // Closure
      (function(i) {
        setTimeout(function() {
          tailleInt += 2;
          var tailleSt = tailleInt + "px";
          baniereEvent.style.height = tailleSt;
        }, 10*i)
      })(i);
    };
    
    setTimeout(function() {
      citationTitre.style.opacity = "0";
      baniereEvent.appendChild(citationTitre);//insertBefore(citationTitre, bouton);
      apparition(citationTitre);}, 700);
    
    baniereEvent.className = "bkgTrame deplier";
  };
  
});


/*
---------------------------------------------------------------------------------------------------------

  SCRIPT SLIDESHOW

---------------------------------------------------------------------------------------------------------
*/

var slideIndex = [1, 1, 1, 1, 1, 1, 1, 1];

showSlide(1, "slideshow1",0);
showSlide(1, "slideshow2",1);
showSlide(1, "slideshow3",2);
showSlide(1, "slideshow4",3);
showSlide(1, "slideshow5",4);
showSlide(1, "slideshow6",5);
showSlide(1, "slideshow7",6);
showSlide(1, "slideshow8",7);

function plusSlide(n, slideshow, nIndex) {
  var x = slideIndex[nIndex] += n;
  showSlide(x, slideshow, nIndex)
}

function currentSlide(n, slideshow, nIndex) {
  var x = slideIndex[nIndex] = n;
  showSlide(x, slideshow, nIndex)
}

function showSlide(n, slideshow, nIndex) {
  var i;
  var slideshowX = document.getElementById(slideshow);
  var slides = slideshowX.getElementsByClassName("mySlides");
  var dots = slideshowX.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex[nIndex] = 1}
  if (n < 1) {slideIndex[nIndex] = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex[nIndex] - 1].style.display = "block";
  dots[slideIndex[nIndex] - 1].className += " active";
}
