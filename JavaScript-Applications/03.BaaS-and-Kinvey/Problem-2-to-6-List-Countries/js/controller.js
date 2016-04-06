var app = app || {};

app.controller = (function () {
    function Main(dataPersister) {
        this.persister = dataPersister;
    }

    Main.prototype.load = function (selector) {
        this.attachEventHandlers();
        this.loadCountries(selector);
    };

    Main.prototype.loadCountries = function (selector) {
        this.persister.countries.getAll('',
            function (data) {
                var country;
                $(selector).html('');

                for (var i = 0; i < data.length; i++) {
                    country = data[i];

                    var countryWrapper = $('<div />');
                    countryWrapper.append($('<div />').append(country.name));
                    countryWrapper.append($('<div />').append($('<button class="remove-country">Delete</button>')));
                    countryWrapper.append($('<div />').append($('<input class="edit-country-name" placeholder="Country name ...">')));
                    countryWrapper.append($('<div />').append($('<button class="edit-country">Edit</button>')));
                    countryWrapper.append($('<div />').append($('<button class="show-towns">Show towns</button>')));
                    countryWrapper.append($('<div />').append($('<input class="add-town-name" placeholder="Town name ...">')));
                    countryWrapper.append($('<div />').append($('<button class="add-town">Add town</button>')));
                    countryWrapper.attr('data-id', country._id);

                    $(selector).append(countryWrapper);
                }
            },
            function (error) {
                console.log(error);
                $(selector).html(error)
            });
    };

    Main.prototype.loadTowns = function (selector, itemId) {
        this.persister.towns.getAll('/?query={"country._id":"' + itemId + '"}',
            function (data) {
                var town;
                $(selector).html('');
                $(selector).css('visibility', 'visible');

                if (!data.length) {
                    $(selector).append('<div>No towns added.</div>');
                    return;
                }

                for (var i = 0; i < data.length; i++) {
                    town = data[i];
                    var townWrapper = $('<div />');
                    townWrapper.append($('<div />').append(town.name));
                    townWrapper.append($('<div />').append($('<button class="remove-town">Delete</button>')));
                    townWrapper.append($('<div />').append($('<input class="edit-town-name" placeholder="Town name">')));
                    townWrapper.append($('<div />').append($('<button class="edit-town">Edit</button>')));
                    townWrapper.attr('data-id', town._id).attr('data-country-id', itemId);

                    $(selector).append(townWrapper);
                }
            },
            function (error) {
                console.log(error);
                $(selector).html(error);
            });
    };

    Main.prototype.attachEventHandlers = function () {
        var _this = this;
        $('#add-country-btn').on('click', function (ev) {
            var countryName = $('#add-country-name').val();
            var regex = new RegExp("^[a-zA-Z ]+$");
            if (countryName === '') {
                throw new Error('Country name is required!');
            } else if (!regex.test(countryName)) {
                throw new Error('Country name is not correct!');
            }

            // Check if country already exist
            _this.persister.countries.getAll('',
                function(data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].name === countryName) {
                            throw new Error('Country already exits.');
                        }
                    }

                    var country = {
                        name: countryName
                    };

                    _this.persister.countries.add(country,
                        function (data) {
                            _this.loadCountries('#countries');
                        },
                        function (error) {
                            console.log(error);
                        }
                    );
                },
                function(error) {
                    console.log(error);
                }
            );

            ev.preventDefault();
            return false;
        });

        $('#countries').on('click', '.remove-country', function (ev) {
            var id = $(this).parent().parent().attr('data-id');
            _this.persister.countries.remove(id,
                function (data) {
                    _this.loadCountries('#countries');
                    _this.persister.towns.getAll('/?query={"country._id":"' + id + '"}',
                        function (data) {
                            for (var i = 0; i < data.length; i++) {
                                var town = data[i];
                                // When country is deleted, all her towns are also deleted
                                var townId = town._id;
                                _this.persister.towns.remove(townId,
                                    function (data) {
                                        _this.loadTowns('#towns', id);
                                    },
                                    function (error) {
                                        console.log(error);
                                    }
                                );
                            }
                        },
                        function (error) {
                            console.log(error);
                        }
                    )
                },
                function (error) {
                    console.log(error);
                }
            );

            ev.preventDefault();
            return false;
        });

        $('#countries').on('click', '.edit-country', function (ev) {
            var id = $(this).parent().parent().attr('data-id');
            var newCountryName = $(this).parent().prev('div').find('.edit-country-name').val();
            var country = {
                name: newCountryName
            };
            var regex = new RegExp("^[a-zA-Z ]+$");
            if (newCountryName === '') {
                throw new Error('Country name is required!');
            } else if (!regex.test(newCountryName)) {
                throw new Error('Country name is not correct!');
            } else {
                _this.persister.countries.getAll('',
                    function(data) {
                        // Check if country with that name already exist
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].name === newCountryName) {
                                throw new Error('Country already exits.');
                            }
                        }

                        _this.persister.countries.update(id, country,
                            function (data) {
                                _this.loadCountries('#countries');
                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }

            ev.preventDefault();
            return false;
        });

        $('#countries').on('click', '.show-towns', function (ev) {
            var id = $(this).parent().parent().attr('data-id');
            _this.loadTowns('#towns', id);
        });

        $('#countries').on('click', '.add-town', function (ev) {
            var id = $(this).parent().parent().attr('data-id');
            var townNameParentElement = $(this).parent().prev()[0];
            var townName = townNameParentElement.firstElementChild.value;
            var regex = new RegExp("^[a-zA-Z ]+$");
            if (townName === '') {
                throw new Error('Town name is required!');
            } else if (!regex.test(townName)) {
                throw new Error('Town name is not correct!');
            } else {
                var town = {
                    name: townName,
                    country: {
                        "_type": "KinveyRef",
                        "_id": id,
                        "_collection": "countries"
                    }
                };

                _this.persister.towns.getAll('/?query={"country._id":"' + id + '"}',
                    function (data) {
                        // Check if town already exist
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].name === townName) {
                                throw new Error('Town already exits.');
                            }
                        }

                        _this.persister.towns.add(town,
                            function (data) {
                                console.log('Town added successfully');
                                _this.loadTowns('#towns', id);
                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }

            ev.preventDefault();
            return false;
        });

        $('#towns').on('click', '.remove-town', function (ev) {
            var townId = $(this).parent().parent().attr('data-id');
            var countryId = $(this).parent().parent().attr('data-country-id');
            _this.persister.towns.remove(townId,
                function (data) {
                    _this.loadTowns('#towns', countryId);
                },
                function (error) {
                    console.log(error);
                }
            );
        });

        $('#towns').on('click', '.edit-town', function (ev) {
            var id = $(this).parent().parent().attr('data-id');
            var countryId = $(this).parent().parent().attr('data-country-id');
            var newTownName = $(this).parent().prev('div').find('.edit-town-name').val();
            var town = {
                name: newTownName,
                country: {
                    "_type": "KinveyRef",
                    "_id": countryId,
                    "_collection": "countries"
                }
            };
            var regex = new RegExp("^[a-zA-Z ]+$");
            if (newTownName === '') {
                throw new Error('Town name is required!');
            } else if (!regex.test(newTownName)) {
                throw new Error('Town name is not correct!');
            } else {
                _this.persister.towns.getAll('/?query={"country._id":"' + countryId + '"}',
                    function (data) {
                        // Check if town already exist
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].name === newTownName) {
                                throw new Error('Town already exits.');
                            }
                        }

                        _this.persister.towns.update(id, town,
                            function (data) {
                                _this.loadTowns('#towns', countryId);
                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }

            ev.preventDefault();
            return false;
        });
    };

    return {
        get: function (dataPersister) {
            return new Main(dataPersister);
        }
    }
}());