/*! MaskSelect2 0.1.0 - MIT license - Copyright 2024 Deivid Hugo */
/*! Created by Deivid Hugo to apply mask patterns to Select2 elements */

(function ($) {
    class MaskSelect2 {
        /**
         * Gets the Select2 container and applies the mask pattern if needed.
         * @param {jQuery} $select - The jQuery-wrapped Select2 element.
         * @param {string} maskPattern - The mask pattern to apply.
         * @param {boolean} enableTagCreationWhenMaskComplete - Indicates whether to enforce the mask pattern on tag creation.
         * @returns {jQuery|null} The jQuery-wrapped Select2 container, or null if not found.
         */
        static getSelect2Container($select, maskPattern, enableTagCreationWhenMaskComplete) {
            let select2Data = $select.data('select2');
            const originalOptions = $select.data('select2')?.options?.options || {};

            if (enableTagCreationWhenMaskComplete && !originalOptions.tags) {
                console.warn('EnableTagCreationWhenMaskComplete is true, but the tags option is disabled. Please enable tags to use this feature.');
            } 

            if (select2Data && enableTagCreationWhenMaskComplete) {
                originalOptions.createTag = function (params) {
                    const maskLength = maskPattern.length;
                    if (params.term.length !== maskLength) {
                        return null;
                    }
                    return { id: params.term, text: params.term };
                };

                try {
                    $select.select2(originalOptions);
                    select2Data = $select.data('select2');
                } catch (error) {
                    console.warn('Unable to apply enableTagCreationWhenMaskComplete. Failed to reload Select2:', error);
                    return null;
                }
            }

            return select2Data?.$container || null;
        }

        /**
         * Applies the mask pattern to the search field of a Select2 element.
         * @param {jQuery} $element - The jQuery-wrapped Select2 container.
         * @param {string} maskPattern - The mask pattern to apply.
         */
        static applyMaskToSearchField($element, maskPattern) {
            if (typeof maskPattern !== 'string') {
                console.warn('The maskPattern parameter must be a string. Received value:', maskPattern);
                return;
            }

            const $searchField = $element.find('.select2-search__field');
            if ($searchField.length) $searchField.mask(maskPattern);
        }

        /**
         * Applies the mask pattern to the Select2 element and sets up a mutation observer
         * to handle dynamically added search fields.
         * @param {HTMLElement} selectElement - The original select element.
         * @param {string} maskPattern - The mask pattern to apply.
         * @param {boolean} enableTagCreationWhenMaskComplete - Indicates whether to enforce the mask pattern on tag creation.
         */
        static applyMaskToSelect2($selectElement, maskPattern, enableTagCreationWhenMaskComplete) {
            const $select2Container = this.getSelect2Container($selectElement, maskPattern, enableTagCreationWhenMaskComplete);

            if ($select2Container && $select2Container.length) {
                this.applyMaskToSearchField($select2Container, maskPattern);

                new MutationObserver(mutations => {
                    mutations.forEach(mutation => {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                this.applyMaskToSearchField($(node), maskPattern);
                            }
                        });
                    });
                }).observe($select2Container[0], { childList: true, subtree: true });
            } else {
                console.warn('Select2 is not activated on this element:', selectElement);
            }
        }
    }

    /**
     * jQuery plugin to apply a mask pattern to Select2 elements.
     * @param {string} maskPattern - The mask pattern to apply.
     * @param {boolean} enableTagCreationWhenMaskComplete - Indicates whether to enforce the mask pattern on tag creation.
     * @returns {jQuery} - The jQuery object for chaining.
     */
    $.fn.maskSelect2 = function (maskPattern, enableTagCreationWhenMaskComplete = false) {
        this.each(function () {
            MaskSelect2.applyMaskToSelect2($(this), maskPattern, enableTagCreationWhenMaskComplete);
        });

        return this;
    };
})(jQuery);