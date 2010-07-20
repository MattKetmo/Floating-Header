/**
 * Floating Header - jQuery Plugin
 * 
 * @author  Matthieu Moquet <matt.ketmo@gmail.com>
 * @link    http://github.com/MattKetmo/Floating-Header
 */
(function($){
/**
 * Main function 
 */
$.fn.floatHeader = function(params) {
    
    config = $.extend( {
        headerSelector: 'header',
        footerSelector: 'footer'
    }, params);
    
    return this.each(function(options){
        var self    = $(this);
        var hHeader = self.children(config.headerSelector); // FIX autodetect > html5/table/class
        var hBody   = null;
        var hFooter = self.children(config.footerSelector);

        var hFloatingHeader = null;
        var headerIsVisible = false;
        
        //# bind  to the scroll event
        $(window).scroll(function() {
            if (_isOnTop(self)) { // FIX self to header
                //# header must be visible
                if (!headerIsVisible) {
                    //# create floating header
                    hFloatingHeader = _cloneHeader(hHeader);
                    
                    //# insert floating header at the end of element,
                    //# or before footer if existing
                    if (hFooter != null) {
                        hFloatingHeader.insertBefore(hFooter);
                    } else {
                        self.append(hFloatingHeader);
                    }

                    headerIsVisible = true;
                    
                    hFloatingHeader.css('opacity','0.9');
                    hFloatingHeader.css('position','fixed');
                    hFloatingHeader.hover(
                        function() {$(this).fadeTo('fast', 1);},
                        function() {$(this).fadeTo('fast', 0.9);}
                    );
                }
                _ajustOnTop(hFloatingHeader, self.children('.entry'));
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

    return this;
};

/**
 * Clone of the header element on the top
 * 
 * @param element
 * @return The cloned header element
 */
function _cloneHeader(header) {
    var clonedHeader = header.clone();
    clonedHeader.css('width', header.width()+'px');
    
    return clonedHeader;
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
    var windowYOffset  = $(window).scrollTop();
    var elementYOffset = $(element).offset().top;
    var heightVisible  = elementYOffset + $(element).height() - windowYOffset;
    
    if (heightVisible < header.height()) {
        var topOffset = heightVisible - header.height(); //# negative value
        header.css('top',topOffset+'px');
    } else {
        header.css('top','0px');
    }
}

/**
 * Check is the element "touch" the top of the screen
 * 
 * @param element The element to check
 * @return boolean
 */
function _isOnTop(element) {
    var windowYOffset  = $(window).scrollTop();
    var elementYOffset = $(element).offset().top;
    
    //# windowYOffset should be between the top and the bottom of the 
    //# element (i.e. elementYOffset & elementYOffset + elementHeight)
    return (elementYOffset <= windowYOffset) && 
            (windowYOffset <= (elementYOffset + $(element).height()));
}

}(jQuery));