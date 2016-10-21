/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Description: This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined',function() {
            var len=allFeeds.length
            for (var i = 0; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
            };
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Names are defined',function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe("");
            };
         });

    });


    /*    This test ensures that the menu element is
          hidden by default. 
         The next test ensures the menu changes
          * visibility when the menu icon is clicked.
          */
    describe('The menu', function() {
        it('Menu is hidden',function(){
            expect(document.body.className).toContain('menu-hidden');
        });

        it('Menu changes visibility',function(){
            $(".menu-icon-link").click();
            expect(document.body.className).not.toContain('menu-hidden');
            $(".menu-icon-link").click();
                expect(document.body.className).toContain('menu-hidden');
        });
    });



         /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

         /* 
         1.Followed Videos on Asynchronous Tests
         2.Followed MarkN and JohnMav's directions on the Udacity forums on how to go about with the following tests 
         3.Following are the links from the Udacity forum from where I obtained guidelines:
         https://discussions.udacity.com/t/new-feed-selection-test/15741/2
         https://discussions.udacity.com/t/step-13-help-initial-entries/14839/13
         */

         describe('Initial Entries', function(){
            beforeEach(function(done) {
                loadFeed(0,done);
            });
            it('Ensures that there is atleast a single .entry element within .feed container', function(done) {
                expect($('.feed .entry').length).not.toBe(0);
                done();
            });
         });

    
        /*This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */

         describe('New Feed Selection', function() {
            var feedEntry1,feedEntry2
            beforeEach(function(done){
                loadFeed(0,function(){
                    feedEntry1=$('.feed').text();
                    loadFeed(1,function(){
                        feedEntry2=$('.feed').text();
                        done();
                });
                });
            });
            it('Ensures that the content changes when new feed is loaded ',function(){
                expect(feedEntry2).not.toEqual(feedEntry1);
            });
         });


}());
