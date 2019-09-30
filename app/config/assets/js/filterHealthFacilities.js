/**
 * Responsible for rendering the home screen.
 */
'use strict';
/* global odkTables */

function display() {

    var body = $('#main');
    // Set the background to be a picture.
    body.css('background-image', 'url(img/hallway.jpg)');

    var locale = odkCommon.getPreferredLocale();
    $('#health-facilities').text(odkCommon.localizeText(locale, "health_facilities"));
    $('#filter-facilities-by-type').text(odkCommon.localizeText(locale, "filter_by_type"));
    $('#search-facilities-by-name-id').text(odkCommon.localizeText(locale, "search_by_name_id"));

    var viewFacilitiesButton = $('#filter-facilities-by-type');
    viewFacilitiesButton.on(
        'click',
        function() {
            odkTables.launchHTML(null,'config/assets/filterHealthFacilitiesByType.html');
        }
    );

    var viewRefrigeratorsButton = $('#search-facilities-by-name-id');
    viewRefrigeratorsButton.on(
        'click',
        function() {
            odkTables.launchHTML(null,'config/tables/health_facilities/html/health_facilities_list.html');
        }
    );

}
