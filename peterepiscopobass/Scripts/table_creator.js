
        // Function to create the table and add it to the form
        function createTable() {

            var rules = ['name', 'artist']

            var songs_array = getSongsObj()

            console.log(songs_array)

            // Loop to create rows and cells
            for (var i = 0; i < songs_array.length; i++) {
                // Create a new row element
                var row = document.createElement("tr");

                var obj_keys = Object.keys(songs_array[i])

                // Loop to create cells in the current row
                for (var j = 0; j < obj_keys.length; j++) {
                    // Create a new cell element
                    var cell = document.createElement("td");
                    
                    if (obj_keys[j] === 'name' || obj_keys[j] === 'artist'){
                        // SONG DETAILS
                        cell.textContent = songs_array[i][obj_keys[j]];

                    } else if (obj_keys[j] === 'youtube_id'){
                        // YOUTUBE VIDEO
                        var iframe = document.createElement("iframe");
                        iframe.width = "280";
                        iframe.height = "158";
                        iframe.src = "https://www.youtube.com/embed/" + songs_array[i][obj_keys[j]];
                        iframe.title = "Embedded Video";
                        iframe.frameBorder = "0";
                        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                        iframe.allowFullscreen = true;
                        cell.appendChild(iframe);
                    } else {
                        // DOWNLOAD LINKS
                        var link = document.createElement("a")
                        var fileExtension = ""
                        var filePath = ""
                        if (obj_keys[j] === 'pdf_file'){
                            filePath = 'Tabs/PDF/'
                            fileExtension = '.pdf'
                        } else {
                            filePath = 'Tabs/GP5/'
                            fileExtension = '.gp5'
                        }
                        link.setAttribute("href", filePath + songs_array[i][obj_keys[j]] + fileExtension);
                        link.setAttribute("target", "_blank");
                        var button = document.createElement("button")
                        button.textContent = 'Download File'
                        link.appendChild(button)
                        cell.appendChild(link)
                    }


                    // Add the cell to the current row
                    row.appendChild(cell);
                }

                // Get the form element by its ID
                var table = document.getElementById("tabs");

                // Add the row to the table
                table.appendChild(row);
            }
        }

        // SONGS OBJECT
        function getSongsObj(){

            var songs = [
                {
                    "name": 'My Name is Mud',
                    "artist": 'Primus',
                    "pdf_file": 'My Name is Mud - Primus (Peter Episcopo)',
                    "gp5_file": 'My Name is Mud - Primus (Peter Episcopo)',
                    "youtube_id": '92p0QDDvRU8'
                },
                {
                    "name": 'Just You and I',
                    "artist": 'Tom Walker',
                    "pdf_file": 'Just You and I - Tom Walker (Peter Episcopo)',
                    "gp5_file": 'Just You and I - Tom Walker (Peter Episcopo)',
                    "youtube_id": '-9Sv3S5Qx3k'
                },
                {
                    "name": 'Daydreaming',
                    "artist": 'Radiohead',
                    "pdf_file": 'Daydreaming - Radiohead (Peter Episcopo)',
                    "gp5_file": 'Daydreaming - Radiohead (Peter Episcopo)',
                    "youtube_id": 'wmL3OyMzEu4'
                },
                {
                    "name": 'Hand Cannot Erase',
                    "artist": 'Steven Wilson',
                    "pdf_file": 'Hand Cannot Erase - Steven Wilson (Peter Episcopo)',
                    "gp5_file": 'Hand Cannot Erase - Steven Wilson (Peter Episcopo)',
                    "youtube_id": 'O9cQQZPu5ZY'
                },
                {
                    "name": 'Fratres',
                    "artist": 'Arvo Part',
                    "pdf_file": 'Fratres - Arvo Part (Peter Episcopo)',
                    "gp5_file": 'Fratres - Arvo Part (Peter Episcopo)',
                    "youtube_id": 'VGd3WlkfuLo'
                },
                {
                    "name": 'Born in Dissonance',
                    "artist": 'Meshuggah',
                    "pdf_file": 'Born in Dissonance - Meshuggah (Peter Episcopo)',
                    "gp5_file": 'Born in Dissonance - Meshuggah (Peter Episcopo)',
                    "youtube_id": 'abTdFMlk52c'
                },
                {
                    "name": 'Nostrum',
                    "artist": 'Meshuggah',
                    "pdf_file": 'Nostrum - Meshuggah (Peter Episcopo)',
                    "gp5_file": 'Nostrum - Meshuggah (Peter Episcopo)',
                    "youtube_id": 'pDvNvPTBRfE'
                },
                {
                    "name": 'Still Life in Mobile Homes',
                    "artist": 'Japan',
                    "pdf_file": 'Still Life in Mobile Homes - Japan (Peter Episcopo)',
                    "gp5_file": 'Still Life in Mobile Homes - Japan (Peter Episcopo)',
                    "youtube_id": '12jFtIpkmwE'
                },
                {
                    "name": 'Vancouver',
                    "artist": 'Jeff Buckley',
                    "pdf_file": 'Vancouver - Jeff Buckley (Peter Episcopo)',
                    "gp5_file": 'Vancouver - Jeff Buckley (Peter Episcopo)',
                    "youtube_id": 'XUPrlF75He4'
                },
                {
                    "name": 'One Better',
                    "artist": 'Les Claypool',
                    "pdf_file": 'One Better - Les Claypool (Peter Episcopo)',
                    "gp5_file": 'One Better - Les Claypool (Peter Episcopo)',
                    "youtube_id": 'aOPJ0VbgjxM'
                }
            ]

            var sorted_object = sortObjectsByName(songs)

            console.log(sorted_object)

            return sorted_object
        }

        // SORT SONGS ARRAY
        function sortObjectsByName(objectArray) {
            // Use the sort method with a custom comparison function
            objectArray.sort(function(a, b) {
              // Convert the names to lowercase to ensure case-insensitive sorting
              var nameA = a.name.toLowerCase();
              var nameB = b.name.toLowerCase();
          
              // Compare the names and return the comparison result
              if (nameA < nameB) {
                return -1; // a should come before b
              } else if (nameA > nameB) {
                return 1; // a should come after b
              } else {
                return 0; // names are equal, no change in order
              }
            });

            return objectArray
          
          }

        // Call the function to create and add the table when the document is ready
        document.addEventListener("DOMContentLoaded", createTable);