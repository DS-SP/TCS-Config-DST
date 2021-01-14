$(document).ready(function() {
  debugger;
  $(".menu_icon").click(function() {
    $('.mobile-menu').toggleClass('menu_shown');
  });

  $(".hamburger").click(function(e) {
    $("ul.main_navigation")
      .stop(true, false)
      .slideToggle()
      .toggleClass("menu-open");
  });

  var isMobile = $(window).width() <= 1023;

  if (isMobile) {
    $(".main_navigation").addClass("mobile-menu").removeClass("desktop-menu");
    mobileMenu();
  } else {
    $(".main_navigation").addClass("desktop-menu").removeClass("mobile-menu");
    desktopMenu();
  }
});

$(window).on("resize", function() {
  var isMobile = $(window).width() <= 1023;
  if (isMobile) {
    $(".main_navigation").addClass("mobile-menu").removeClass("desktop-menu");
    mobileMenu(isMobile);
  } else {
    $('.main_navigation').addClass('desktop-menu').removeClass('mobile-menu').removeAttr('style');
    desktopMenu();
  }
});

var mobileMenu = function(isMobile) {
  $(".main_navigation li").each(function() {
    if ($(this).children("ul").length) {
      $(this).addClass("has-submenu");
    }
  });

  $(".nav ul li").click(function(e) {
    if ($(".main_navigation").hasClass("mobile-menu")) {
      if ($(this).children("ul").length > 0) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).hasClass("back")) {
          $(this).closest("ul").find("li").removeClass("back");
          $(this).find("li").find("ul").removeClass("active").hide();
          $(this).find("li").removeClass("active in-active");
          //$(this).find('li').removeClass('in-active');
        } else {
          $(this).addClass("active");
          $(".main_mobile_menu").addClass("back");
          $("li:not('.active')").addClass("in-active");
          $(this).find("li").removeClass("active in-active");
          $(this).find("li ul").removeClass("active");
          $("li.active").not(this).addClass("back");
          $(this).children("ul").addClass("active").slideDown("800");
        }
      } else {
        var url = $(this).children("a").attr("href");
        window.location = url;
      }
    }
  });

  $(".main_mobile_menu").click(function(e) {
    if ($(".main_navigation").hasClass("mobile-menu")) {
      if ($(this).hasClass("back")) {
        $(this).removeClass("back");
        $("li").addClass("in-active");
        $("ul.main_navigation > li").removeClass("active back in-active");
        $("ul.main_navigation > li > ul").removeClass("active").hide();
      }
    }
  });
};

var resetClasses = function() {
  $('.nav').find('.active, .in-active, .back, .open, .menu-open, .menu_shown').removeClass('active in-active back open menu-open menu_shown').removeAttr('style');
};

var desktopMenu = function() {
  resetClasses();
  $(".nav ul.main_navigation > li")
    .mouseover(function() {
      if ($(".main_navigation").hasClass("desktop-menu")) {
        $(".sub_menu .sub_menu .sub_menu")
          .parents()
          .prev("span")
          .addClass("sub_menu_parent");
        $(this).addClass("open");
        var sum = 0,
          menuCol = $(this).find(".main_sub_menu .grid .column"),
          maxHeight = 626; //menuCol.height();
        console.log("Cal Max Ht" + maxHeight);

        menuCol.each(function() {
          var colHeight = 0;
          $(this)
            .children()
            .each(function() {
              colHeight += $(this).outerHeight(true);
              //colHeight = colHeight + 20;
            });
          console.log("Height" + colHeight);
          console.log("col-count " + colHeight / maxHeight);
          if (colHeight > maxHeight) {
            var columnCount = colHeight / maxHeight,
              exactCol = columnCount.toFixed(1),
              integer = exactCol.toString().split(".")[0],
              fraction = exactCol.toString().split(".")[1];
            integer = parseInt(integer);
            fraction = parseInt(fraction);
            console.log("Fraction No" + fraction);
            if (fraction >= 1) {
              columnCount = integer + 1;
            } else {
              columnCount = integer;
            }
            console.log("Int " + exactCol.toString().split(".")[0]);
            console.log("frac" + exactCol.toString().split(".")[1]);
            console.log("count new " + columnCount);
            $(this).addClass("column-" + columnCount);
          }
        });
      }

      var subMenu = $(this).children(".main_sub_menu"),
        activeMenuOffset = $(this).position().left,
        mainMenuWidth = $(this).outerWidth(),
        subMenuWidth = subMenu.width(),
        mid = activeMenuOffset - subMenuWidth / 2 + mainMenuWidth / 2,
        position = Math.round(mid);

      if (position > 0) {
        $(subMenu).css("left", position);
      } else {
        $(subMenu).css("left", 0);
      }
    })
    .mouseout(function() {
      if ($(".main_navigation").hasClass("desktop-menu")) {
        $(".column").removeClass(function(index, className) {
          return (className.match(/(^|\s)column-\S+/g) || []).join(" ");
        });
        $(this).removeClass("open");
      }
    });

};
