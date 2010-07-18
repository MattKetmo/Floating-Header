/**
 * 
 */
(function($){
    /**
     * Main function 
     */
    $.fn.floatHeader = function() {
    
        return this.each(function(options){
            var self = $(this);
            var headerIsVisible = false;
            var floatingHeader = null;
            
            // bind  to the scroll event
            $(window).scroll(function() {
                if (_isOnTop(self)) {
                // header must be visible
                    if (!headerIsVisible) {
                        // create floating header
                        floatingHeader = _cloneHeader(self);
                        headerIsVisible = true;
                    }
                    _ajustOnTop(floatingHeader, self.children('.entry'));
                } else {
                    // header should not be visible
                    if (headerIsVisible) {
                        // remove floating header
                        floatingHeader.remove();
                        headerIsVisible = false;
                    }
                }
            });
        });
    };
    
    /**
     * Show a clone of the header element on the top
     * 
     * @param element
     * @return The cloned header element
     */
    function _cloneHeader(element) {
        var header = element.children('header');
        var clonedHeader = header.clone();
        clonedHeader.css('width',header.width()+'px');
        element.prepend(clonedHeader);
        
        element.hover(
            function() {$(this).fadeTo('fast', 1);},
            function() {$(this).fadeTo('fast', 0.9);}
        );
    
        return clonedHeader;
    }
  
    /**
     * Ajust the header on the top of the screen
     * 
     * @param {Object} header
     * @param {Object} element
     */
    function _ajustOnTop(header, element) {
        header.css('position','fixed');
        header.css('opacity','0.9');
        //header.css('border-bottom','solid #ddd 1px');

        var top = $(window).scrollTop();
        var y0  = $(element).offset().top;
    
        if (y0 + $(element).height() - top < header.height()) {
          var topOffset = header.height() - (y0 + $(element).height() - top);
          header.css('top','-'+topOffset+'px');
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
        var top = $(window).scrollTop();
        var y0  = $(element).offset().top;
        
        return (y0 <= top) && top <= (y0 + $(element).height());
    }
}(jQuery));