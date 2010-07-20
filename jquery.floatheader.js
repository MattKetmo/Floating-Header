/**
 * Floating Header - jQuery Plugin
 * 
 * @author  Matt Ketmo <matt.ketmo@gmail.com>
 * @link    http://github.com/MattKetmo/Floating-Header
 */
(function($){
/**
 * Main function 
 */
$.fn.floatHeader = function(params) {
    
    config = $.extend( {
        headerSelector: 'header',
        bodySelector:   '.entry',
        footerSelector: 'footer'
    }, params);
    
    return this.each(function(options){
        //# Handles
        var self    = $(this);
        // FIXME autodetect from self type > html5/table/class
        var hHeader = self.children(config.headerSelector);
        var hBody   = self.children(config.bodySelector);
        var hFooter = self.children(config.footerSelector);

        var hFloatingHeader = null;
        var headerIsVisible = false;
        
        //# bind  to the scroll event
        $(window).scroll(function() {
            if (_isOnTop(self)) {
                //# header must be visible
                if (!headerIsVisible) {
                    //# create floating header
                    hFloatingHeader = _cloneElement(hHeader);
                    
                    //# insert floating header at the end of element,
                    //# or before footer if existing
                    if (hFooter != null) {
                        hFloatingHeader.insertBefore(hFooter);
                    } else {
                        self.append(hFloatingHeader);
                    }

                    headerIsVisible = true;
                    
                    // FIXME should not be here
                    hFloatingHeader.css('opacity','0.9');
                    hFloatingHeader.hover(
                        function() {$(this).fadeTo('fast', 1);},
                        function() {$(this).fadeTo('fast', 0.9);}
                    );
                }
                _ajustOnTop(hFloatingHeader, hBody);
            } else {
                //# header should not be visible
                if (headerIsVisible) {
                    //# remove floating header
                    hFloatingHeader.remove();
                    headerIsVisible = false;
                }
            }
        });
    });
};

/**
 * Clone element, keeping same width and height of the original
 * 
 * @param element The element to clone
 * @return The cloned element
 */
function _cloneElement(element) {
    var clonedElement = element.clone();
    clonedElement.css('width', element.width()+'px');
    clonedElement.css('height', element.height()+'px');
    
    return clonedElement;
}

/**
 * Ajust the header on the top of the screen
 * 
 * @param {Object} header
 * @param {Object} element
 */
function _ajustOnTop(header, element) {
    //# If element visible, header must be either stick on top of screen,
    //# (i.e. position:fixed;top:0px;) or at the bottom of the element
    //# (i.e. position:absolute;bottom:0px;)
    var windowTop     = $(window).scrollTop();
    var elementTop    = $(element).offset().top;
    var heightVisible = elementTop + $(element).height() - windowTop;
    
    if (heightVisible < header.height()) {
        var topOffset = heightVisible - header.height(); //# negative value
        header.css('top',topOffset+'px');
        header.css('position','fixed');
        //header.css('top','');
        //header.css('bottom','0px');
        //header.css('position','absolute');
    } else {
        header.css('top','0px');
        header.css('position','fixed');
    }
}

/**
 * Check is the element "touch" the top of the "visible screen"
 * 
 * @param element The element to check
 * @return {boolean}
 */
function _isOnTop(element) {
    //# windowTop is the position of the top of the "visible screen"
    //# elementTop is the position of the top of the element
    //# elementBottom is the position of the bottom of the element
    var windowTop     = $(window).scrollTop();
    var elementTop    = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();
    
    //# windowTop should be between the top and the bottom of the 
    //# element (i.e. elementTop & elementBottom)
    return (elementTop <= windowTop) && (windowTop <= elementBottom);
}

}(jQuery));