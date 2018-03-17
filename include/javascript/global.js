/*
    Copyright (c) 2018 Patrick Demian

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

//Change change all links so they point to the correct size
function change_urls(size) {
    //change all the links so they point to the correct text size
    $('.modifiable-link').each(function() {			
        $(this).attr('href', 
            modify_url(
                $(this).attr('href'), "text", size, "normal|large|xlarge"));
    });
    $('.modifiable-value').each(function() {
        $(this).attr('value', size);
    });
    
    if(history && history.replaceState) {
        history.replaceState(history.state, "", 
            modify_url(location.href, "text", size, "normal|large|xlarge"));
    }
}

//change the URL to point to the correct size
function modify_url(url, key, value, values) {
    //simplest case: replace
    var re = new RegExp("([?&])" + key + "=(" + values + ")");
    
    if(!!url.match(re)) {
        url = url.replace(re, "$1" + key + "=" + value);
    }
    else {
        var hash = url.indexOf('#');
    
        //test for other parameters. If so, add it to the end (before hash)
        if(/\?/.test(url)) {
            if(hash > 0) {
                url = url.substring(0,hash) + "&" + key + "=" + value + url.substring(hash);
            } 
            else {
                url += "&" + key + "=" + value;
            }
        } 
        else {
            if(hash > 0) {
                url = url.substring(0,hash) + "?" + key + "=" + value + url.substring(hash);
            }
            else {
                url += "?" + key + "=" + value;
            }
        }
    }
    
    return url;
}

//counter for textarea based on how big the textarea's maxlength
function textarea_counter() { 
    var $this = $(this);
    var target = $this.attr('data-count-target');
    var len = $this.val().length;
    var max = $this.attr('maxlength');
    
    if(target) {
        var $target = $(target);
        var s = (max - len) == 1 ? "" : "s";
        
        $target.html((max - len) + " character" + s + " left");
        
        //additional style, which isn't required
        if(max == len) {
            $target.removeClass("warn").addClass("error");
        }
        else if(len/max > 0.75) {
            $target.removeClass("error").addClass("warn");
        }
        else {
            $target.removeClass("warn error");
        }
    }
}
    
$(document).ready(function() {
    
    //textareas (currently only on Contact Me page)
    $areas = $('textarea');
    $areas.each(function() {
        $($(this).attr('data-count-target')).removeClass('hidden');
    });
    $ie_areas = $('.ie textarea');
    
    //oninput is much better, however for IE7/8 this doesn't work, so include a second method
    $areas.on("input", textarea_counter);
    $ie_areas.on('keyup keydown keypress DOMAttrModified propertychange', textarea_counter);

	/* 
		Enchanced Accessibility 
		Allows the page to change font sizes without requiring a refresh
	*/
	
	//jQuery objects
	$body = $('body');
	$size_selectors = $('.font-selector-m, .font-selector-l, .font-selector-xl');
	$size_m = $('.font-selector-m');
	$size_l = $('.font-selector-l');
	$size_xl = $('.font-selector-xl');
    
    //change size selector addresses to '#' to not confuse assistive technology in thinking
    //we're changing pages if we're handling this with JavaScript
    $size_selectors.attr('href', '#');
	
	//size events (the three As)
	$size_m.on('click', function(e) {
		$body.removeClass('m-text l-text xl-text').addClass('m-text');
		$size_selectors.removeClass('font-selector-active');
		$size_m.addClass('font-selector-active');
		
		change_urls("normal");
		return false;
	});
	$size_l.on('click', function(e) {
		$body.removeClass('m-text l-text xl-text').addClass('l-text');
		$size_selectors.removeClass('font-selector-active');
		$size_l.addClass('font-selector-active');
		
        change_urls("large");
        return false;
	});
	$size_xl.on('click', function(e) {
		$body.removeClass('m-text l-text xl-text').addClass('xl-text');
		$size_selectors.removeClass('font-selector-active');
		$size_xl.addClass('font-selector-active');
		
        change_urls("xlarge");
        return false;
	});
});