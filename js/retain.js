$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                unixTimeSubmitted: Date.now()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function() {
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                // Create a new JavaScript Date object based on the unix timestamp (has to be in milliseconds to use Date()).
                var realTime = new Date(note.unixTimeSubmitted);
                // Year part from the timestamp
                var year = realTime.getFullYear();
                // Month part from the timestamp !January is 0, February is 1, and so on!
                var monthIndex = realTime.getMonth();
                const monthNames = [
                    'January', 'February', 'March',
                    'April', 'May', 'June', 'July',
                    'August', 'September', 'October',
                    'November', 'December',
                ];
                const month = monthNames[monthIndex];
                // Day part from the timestamp
                const day = realTime.getDate();
                // Hours part from the timestamp
                var hours = realTime.getHours();
                // Minutes part from the timestamp
                var minutes = "0" + realTime.getMinutes();
                // Seconds part from the timestamp
                var seconds = "0" + realTime.getSeconds();
                // Will display time in 17:11:19 - November 20, 2018 format
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + `- ${month} ${day}, ${year}`;

                htmlStr += '<li class="note">'+
                        '<span class="note-date">' + formattedTime.toString() + '</span>' +
                        note.content +
                    '</li>';
            });
            this.noteList.html(htmlStr);
        }
    };
    localStorage.clear();
    octopus.init();
});