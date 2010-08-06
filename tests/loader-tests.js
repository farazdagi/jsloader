$(document).ready(function(){
        module("Basic Unit Test");

        test("Sample test", function()
            {
            expect(1);
            equals(divide(4,2),
                2,
                'Expected 2 as the result, result was: ' + divide(4,2));
            });
        });
