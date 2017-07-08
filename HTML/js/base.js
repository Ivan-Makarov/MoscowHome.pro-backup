function clear(elements) {
	elements.each(function() {
		if ($(this).val()) {
			$(this).val("");
			}
		if ($(this).next("span").hasClass("selected")) {
			$(this).next("span").removeClass("selected");
			}
		if ($(this).hasClass("error")) {
			$(this).removeClass("error");
			}
		if ($(this).hasClass("success")) {
			$(this).removeClass("success");
			}
		});
	return false;
	}

function resize() {
	$("nav > ul > li").addClass("rotate");
	if ($("nav").hasClass("open")) { 
		$("nav").removeClass("open").addClass("close");
		}
	if ($("ul.sandwich").hasClass("open")) { 
		$("ul.sandwich").removeClass("open").addClass("close");
		}
	$("html").css({"height" : "100%", "overflow" : "auto"});
	$("div.container > header").css({"position" : "absolute"});	
	$("div.container").css({"padding-bottom" : +$("footer").outerHeight()+"px"});
	if ($("div.container > div.form > div:visible").length!=0) {
		if ($("div.container > div.form > div").hasClass("show")) {
			$("div.container > div.form > div").removeClass("show").addClass("hide");
			}
		}
	if ($("div.container > div.form:visible").length!=0) {
		$("div.container > div.form > form").css("top", (($(window).height()-$("div.container > div.form > form").outerHeight())/2)+$(window).scrollTop()+"px");
		$("div.container > div.form > form").css("left", (($(window).width()-$("div.container > div.form > form").outerWidth())/2)+$(window).scrollLeft()+"px");
		}
	return false;
	}

function isName(user_name) {
	var regex = new RegExp(/^([а-яА-Яa-zA-Z _.-]{3,30})+$/);
  	return regex.test(user_name);
	}

function isEmail(user_email) {
	var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  	return regex.test(user_email);
	}

$(document).ready(function() {
	$("ul.sandwich").on("click", function() {
		if ($(this).hasClass("close")) { 
			$(this).removeClass("close").addClass("open");
			$("nav").removeClass("close").addClass("open").css({"height" : +($(window).height()-$("header").outerHeight())+"px"});
			$("html").css({"height" : +$(window).height()+"px", "overflow" : "hidden"});
			$("div.container > header").css({"position" : "fixed"});	
			}
		else { 
			$(this).removeClass("open").addClass("close");
			$("nav").removeClass("open").addClass("close");
			$("html").css({"height" : "100%", "overflow" : "auto"});
			$("div.container > header").css({"position" : "absolute"});
			$("nav > ul > li").addClass("rotate");
			}
		});
	$("nav > ul > li > div").on("click", function() {
		var parent = $(this).parent("li");
		if (parent.hasClass("rotate")) { 
			parent.removeClass("rotate");
			}
		else {
			parent.addClass("rotate");				
			}
		});
	$("div.textarea > textarea").on("propertychange change click keyup input paste",function() {
		if (!$(this).val()) {
			$(this).next("span").removeClass("selected");
			}
		else {
			$(this).next("span").addClass("selected");
			}
		});
	$("div.input > input[type=text]").on("propertychange change click keyup input paste", function() {
		var element = this;
		setTimeout(function () {			
			if (!$(element).val()) {
				$(element).next("span").removeClass("selected");
				if ($(element).hasClass("error")) { 
					$(element).removeClass("error");
					}
				if ($(element).hasClass("success")) { 
					$(element).removeClass("success");
					}
				}
			else {
				$(element).next("span").addClass("selected");
				if ($(element).hasClass("require")) {
					if ($(element).attr("name") == "user_name") {
						var result = isName($(element).val());
						}
					if ($(element).attr("name") == "user_email") {
						var result = isEmail($(element).val());
						}
					if ($(element).attr("name") == "user_phone") {
						var result = $(element).inputmask("isComplete");
						}
					if ($(element).hasClass("choose")) {
						var result = $(element).val().length;
						}
					if (!result) {
						if (!$(element).hasClass("error")) {
							$(element).removeClass("success").addClass("error");
							}
						}
					else {
						if (!$(element).hasClass("success")) { 
							$(element).removeClass("error").addClass("success");
							}
						}
					}
				}
			if ($("div.input."+$(element).data("button")+" > input.require").length != $("div.input."+$(element).data("button")+" > input.require.success").length) {
				if ($("span."+$(element).data("button")+".button").hasClass("active")) { 
					$("span."+$(element).data("button")+".button").removeClass("active");
					}
				}
			else {
				if (!$("span."+$(element).data("button")+".button").hasClass("active")) {
					$("span."+$(element).data("button")+".button").addClass("active");
					}
				}		
			var require = $("div.form > form > input[name=order_type]").val();
			if ($("div.field.input."+require+" > input.require").length != $("div.field.input."+require+" > input.require.success").length) {
				if ($("span.submit").hasClass("active")) {
					$("span.submit").removeClass("active");
					}
				}
			else {
				if (!$("span.submit").hasClass("active")) {
					$("span.submit").addClass("active");
					}				
				}
			}, 100);
		});	
	$("span.button").on("click", function() {
		if ($(this).hasClass("active")) {
			if ($("div.form").length!=0) {
				if ($("div.form > form > span.submit").hasClass("active")) {
					$("div.form > form > span.submit").removeClass("active");
					}
				$("div.form > form > span.submit").css({"display" : "block"});
				$("div.container > div.form > form > div > p").html("").css({"display" : "none"});			
				$("div.form > form > span.header").html($(this).data("name"));
				$("div.form > form > input[name=order_name]").val($(this).data("name"));
				$("div.form > form > input[name=order_type]").val($(this).data("form"));
				$("div.form > form > div > div."+$(this).data("form")).show();
				if ($(this).data("form") == "presentation") {
					$("div.form > form > div > div."+$(this).data("form")+" > input[name=user_name]").val($("div.input.dialog > input[name=user_name]").val()).change();
					$("div.form > form > div > div."+$(this).data("form")+" > input[name=user_email]").val($("div.input.dialog > input[name=user_email]").val()).change();
					clear($("div.input.dialog > input[type=text]"));
					$(this).removeClass("active");
					}
				if ($("div.form").hasClass("hide")) {
					$("div.form").removeClass("hide").addClass("show");
					resize();
					}
				}
			}
		});			
	$("div.form > form > button").on("click", function() {
		if ($("div.form:visible").length!=0) {
			if ($("div.form").hasClass("show")) {
				$("div.form").removeClass("show").addClass("hide");
				}
			$("div.form > form > div > div.field").hide();
			clear($("div.form > form > div > div.field > input[type=text]"));
			clear($("div.form > form > div > div.field > textarea"));
			$("div.form > form > div > p").html("");
			}
		});
	$("div.form > form > span.submit").on("click", function() {
		if ($(this).hasClass("active")) {
			$("div.form > form").submit();
			/* кусок, который нужно потом вырезать */
			$("div.container > div.form > form > div > p").html($("div.form > form > div > div.field.input > input[name=user_name]").val() + ", ").css({"display" : "block"});
			$(this).css({"display" : "none"});
			clear($("div.form > form > div > div.field > input"));
			clear($("div.form > form > div > div.field > textarea"));
			$("div.form > form > div > div.field").css({"display" : "none"});
			/* кусок, который нужно потом вырезать */
			}
		});	
	$("div.form > form > div > div.input.choose > input").on("click", function() {
		var offset = $(this).offset();
		$("div.container > div.form > div > ul."+$(this).data("list")).css({"display" : "block", "left" : +(offset.left-25)+ "px", "top" : +(offset.top+25)+ "px"});
		if ($("div.container > div.form > div").hasClass("hide")) {
			$("div.container > div.form > div").removeClass("hide").addClass("show");
			}
		});
	$("div.container > div.form > div > ul > li").on("click", function() {
		var list = $(this).parent("ul").attr("class");
		$("div.form > form > div > div.field.input.choose > input.choose").val($(this).html()).change();
		$("div.container > div.form > div > ul").css({"display" : "none"});
		if ($("div.container > div.form > div").hasClass("show")) {
			$("div.container > div.form > div").removeClass("show").addClass("hide");
			}
		});
	$("input.phone").inputmask("+7 (999) 999-99-99");
	clear($("div.input > input"));
	clear($("div.textarea > textarea"));
	return false;
	});