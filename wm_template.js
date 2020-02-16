module.exports = {
    ngJsonTemplate:()=>`{
        "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
        "version": 1,
        "newProjectRoot": "projects",
        "projects": {
            "angular-app": {
                "root": "",
                "sourceRoot": "src",
                "projectType": "application",
                "prefix": "app",
                "schematics": {},
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-angular:browser",
                        "options": {
                            "deployUrl": "ng-bundle/",
                            "outputPath": "dist/ng-bundle",
                            "index": "src/index.html",
                            "main": "src/main.ts",
                            "polyfills": "src/polyfills.ts",
                            "tsConfig": "src/tsconfig.app.json",
                            "assets": [
                                "src/favicon.ico",
                                "src/assets",
                                {
                                    "glob": "**/*",
                                    "input": "libraries/locales/",
                                    "output": "/locales/"
                                },
                                {
                                    "glob": "**/*",
                                    "input": "node_modules/wm/locales/",
                                    "output": "/locales/"
                                }
                            ],
                            "styles": [
                                "src/styles.css",
                                "src/assets/styles/css/wm-style.css",
                                "src/assets/styles/css/wm-responsive.css",
                                "src/assets/themes/material/style.css",
                                "src/assets/app.css"
                            ],
                            "scripts": [
                                "./node_modules/lodash/lodash.min.js",
                                "./node_modules/x2js/x2js.js",
                                "./node_modules/d3/d3.min.js",
                                "./node_modules/wm-nvd3/build/nv.d3.min.js",
                                "./node_modules/jquery/dist/jquery.min.js",
                                "./node_modules/jquery-ui/ui/disable-selection.js",
                                "./node_modules/jquery-ui/ui/version.js",
                                "./node_modules/jquery-ui/ui/widget.js",
                                "./node_modules/jquery-ui/ui/scroll-parent.js",
                                "./node_modules/jquery-ui/ui/plugin.js",
                                "./node_modules/jquery-ui/ui/data.js",
                                "./node_modules/jquery-ui/ui/widgets/mouse.js",
                                "./node_modules/jquery-ui/ui/widgets/resizable.js",
                                "./node_modules/jquery-ui/ui/widgets/sortable.js",
                                "./node_modules/jquery-ui/ui/widgets/droppable.js",
                                "./node_modules/wm/scripts/datatable/datatable.js",
                                "./node_modules/wm/scripts/swipey/swipey.jquery.plugin.js",
                                "./node_modules/moment/min/moment.min.js",
                                "./node_modules/fullcalendar/dist/fullcalendar.min.js",
                                "./node_modules/summernote/dist/summernote-lite.min.js",
                                "./node_modules/hammerjs/hammer.min.js",
                                "./node_modules/iscroll/build/iscroll.js",
                                "./node_modules/js-cookie/src/js.cookie.js",
                                "./node_modules/wm/scripts/spotcues/spotcue-utils.js"
                            ]
                        },
                        "configurations": {
                            "production": {
                                "fileReplacements": [
                                    {
                                        "replace": "src/environments/environment.ts",
                                        "with": "src/environments/environment.prod.ts"
                                    }
                                ],
                                "optimization": true,
                                "outputHashing": "all",
                                "sourceMap": false,
                                "extractCss": true,
                                "namedChunks": true,
                                "aot": true,
                                "extractLicenses": true,
                                "vendorChunk": false,
                                "buildOptimizer": true,
                                "budgets": [
                                    {
                                        "type": "initial",
                                        "maximumWarning": "2mb"
                                    }
                                ]
                            }
                        }
                    },
                    "build-ng": {
                        "builder": "@angular-devkit/build-angular:browser",
                        "options": {
                            "outputPath": "dist",
                            "index": "src/index.html",
                            "main": "src/main.ts",
                            "polyfills": "src/polyfills.ts",
                            "tsConfig": "src/tsconfig.app.json",
                            "assets": [
                                "src/favicon.ico",
                                "src/assets"
                            ],
                            "styles": [
                                "src/styles.css",
                                "src/assets/styles/css/wm-style.css",
                                "src/assets/themes/material/style.css",
                                "src/assets/app.css"
                            ],
                            "scripts": [
                                "./node_modules/lodash/lodash.min.js",
                                "./node_modules/x2js/x2js.js",
                                "./node_modules/d3/d3.min.js",
                                "./node_modules/wm-nvd3/build/nv.d3.min.js",
                                "./node_modules/jquery/dist/jquery.min.js",
                                "./node_modules/jquery-ui/ui/disable-selection.js",
                                "./node_modules/jquery-ui/ui/version.js",
                                "./node_modules/jquery-ui/ui/widget.js",
                                "./node_modules/jquery-ui/ui/scroll-parent.js",
                                "./node_modules/jquery-ui/ui/plugin.js",
                                "./node_modules/jquery-ui/ui/data.js",
                                "./node_modules/jquery-ui/ui/widgets/mouse.js",
                                "./node_modules/jquery-ui/ui/widgets/resizable.js",
                                "./node_modules/jquery-ui/ui/widgets/sortable.js",
                                "./node_modules/jquery-ui/ui/widgets/droppable.js",
                                "./libraries/scripts/datatable/datatable.js",
                                "./node_modules/moment/min/moment.min.js",
                                "./node_modules/fullcalendar/dist/fullcalendar.min.js",
                                "./node_modules/summernote/dist/summernote-lite.min.js",
                                "./node_modules/hammerjs/hammer.min.js",
                                "./node_modules/iscroll/build/iscroll.js",
                                "./node_modules/js-cookie/src/js.cookie.js",
                                "./libraries/scripts/spotcues/spotcue-utils.js"
                            ]
                        },
                        "configurations": {
                            "production": {
                                "fileReplacements": [
                                    {
                                        "replace": "src/environments/environment.ts",
                                        "with": "src/environments/environment.prod.ts"
                                    }
                                ],
                                "optimization": true,
                                "outputHashing": "all",
                                "sourceMap": false,
                                "extractCss": true,
                                "namedChunks": false,
                                "aot": true,
                                "extractLicenses": true,
                                "vendorChunk": false,
                                "buildOptimizer": true,
                                "budgets": [
                                    {
                                        "type": "initial",
                                        "maximumWarning": "2mb",
                                        "maximumError": "5mb"
                                    }
                                ]
                            }
                        }
                    },
                    "serve": {
                        "builder": "@angular-devkit/build-angular:dev-server",
                        "options": {
                            "browserTarget": "angular-app:build"
                        },
                        "configurations": {
                            "production": {
                                "browserTarget": "angular-app:build:production"
                            }
                        }
                    },
                    "extract-i18n": {
                        "builder": "@angular-devkit/build-angular:extract-i18n",
                        "options": {
                            "browserTarget": "angular-app:build"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "src/tsconfig.app.json",
                                "src/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/core": {
                "root": "projects/core",
                "sourceRoot": "projects/core/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/core/tsconfig.lib.json",
                            "project": "projects/core/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/core/tsconfig.lib.json",
                                "projects/core/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/base": {
                "root": "projects/components/base",
                "sourceRoot": "projects/components/base/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/base/tsconfig.lib.json",
                            "project": "projects/components/base/ng-package.json"
                        }
                    },
                    "test": {
                        "builder": "@angular-devkit/build-angular:karma",
                        "options": {
                            "main": "projects/components/base/src/test.ts",
                            "polyfills": "projects/components/base/polyfills.ts",
                            "tsConfig": "projects/components/base/tsconfig.spec.json",
                            "karmaConfig": "projects/components/base/karma.conf.js",
                            "styles": [
                                "../wavemaker-app-runtime-angularjs/application/styles/css/wm-style.css"
                            ],
                            "scripts": [
                                "./libraries/scripts/swipey/swipey.jquery.plugin.js"
                            ],
                            "assets": []
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/base/tsconfig.lib.json",
                                "projects/components/base/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/basic": {
                "root": "projects/components/widgets/basic/default",
                "sourceRoot": "projects/components/widgets/basic/default/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/basic/default/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/basic/progress": {
                "root": "projects/components/widgets/basic/progress",
                "sourceRoot": "projects/components/widgets/basic/progress/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/basic/progress/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/basic/rich-text-editor": {
                "root": "projects/components/widgets/basic/rich-text-editor",
                "sourceRoot": "projects/components/widgets/basic/rich-text-editor/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/basic/rich-text-editor/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/basic/search": {
                "root": "projects/components/widgets/basic/search",
                "sourceRoot": "projects/components/widgets/basic/search/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/basic/search/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/basic/tree": {
                "root": "projects/components/widgets/basic/tree",
                "sourceRoot": "projects/components/widgets/basic/tree/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/basic/tree/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/input": {
                "root": "projects/components/widgets/input/default",
                "sourceRoot": "projects/components/widgets/input/default/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/input/default/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/input/calendar": {
                "root": "projects/components/widgets/input/calendar",
                "sourceRoot": "projects/components/widgets/input/calendar/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/input/calendar/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/input/chips": {
                "root": "projects/components/widgets/input/chips",
                "sourceRoot": "projects/components/widgets/input/chips/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/input/chips/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/input/color-picker": {
                "root": "projects/components/widgets/input/color-picker",
                "sourceRoot": "projects/components/widgets/input/color-picker/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/input/color-picker/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/input/currency": {
                "root": "projects/components/widgets/input/currency",
                "sourceRoot": "projects/components/widgets/input/currency/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/input/currency/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/input/epoch": {
                "root": "projects/components/widgets/input/epoch",
                "sourceRoot": "projects/components/widgets/input/epoch/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/input/epoch/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/input/file-upload": {
                "root": "projects/components/widgets/input/file-upload",
                "sourceRoot": "projects/components/widgets/input/file-upload/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/input/file-upload/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/input/rating": {
                "root": "projects/components/widgets/input/rating",
                "sourceRoot": "projects/components/widgets/input/rating/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/input/rating/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/input/slider": {
                "root": "projects/components/widgets/input/slider",
                "sourceRoot": "projects/components/widgets/input/slider/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/input/slider/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/data/card": {
                "root": "projects/components/widgets/data/card",
                "sourceRoot": "projects/components/widgets/data/card/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/data/card/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/data/form": {
                "root": "projects/components/widgets/data/form",
                "sourceRoot": "projects/components/widgets/data/form/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/data/form/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/data/list": {
                "root": "projects/components/widgets/data/list",
                "sourceRoot": "projects/components/widgets/data/list/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/data/list/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/data/pagination": {
                "root": "projects/components/widgets/data/pagination",
                "sourceRoot": "projects/components/widgets/data/pagination/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/data/pagination/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/data/live-table": {
                "root": "projects/components/widgets/data/live-table",
                "sourceRoot": "projects/components/widgets/data/live-table/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/data/live-table/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/data/table": {
                "root": "projects/components/widgets/data/table",
                "sourceRoot": "projects/components/widgets/data/table/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/data/table/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/chart": {
                "root": "projects/components/widgets/chart",
                "sourceRoot": "projects/components/widgets/chart/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/chart/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/containers/accordion": {
                "root": "projects/components/widgets/containers/accordion",
                "sourceRoot": "projects/components/widgets/containers/accordion/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/containers/accordion/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/containers/layout-grid": {
                "root": "projects/components/widgets/containers/layout-grid",
                "sourceRoot": "projects/components/widgets/containers/layout-grid/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/containers/layout-grid/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/containers/panel": {
                "root": "projects/components/widgets/containers/panel",
                "sourceRoot": "projects/components/widgets/containers/panel/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/containers/panel/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/containers/tabs": {
                "root": "projects/components/widgets/containers/tabs",
                "sourceRoot": "projects/components/widgets/containers/tabs/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/containers/tabs/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/containers/tile": {
                "root": "projects/components/widgets/containers/tile",
                "sourceRoot": "projects/components/widgets/containers/tile/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/containers/tile/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/containers/wizard": {
                "root": "projects/components/widgets/containers/wizard",
                "sourceRoot": "projects/components/widgets/containers/wizard/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/containers/wizard/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/navigation/breadcrumb": {
                "root": "projects/components/widgets/navigation/breadcrumb",
                "sourceRoot": "projects/components/widgets/navigation/breadcrumb/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/navigation/breadcrumb/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/navigation/menu": {
                "root": "projects/components/widgets/navigation/menu",
                "sourceRoot": "projects/components/widgets/navigation/menu/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/navigation/menu/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/navigation/navbar": {
                "root": "projects/components/widgets/navigation/navbar",
                "sourceRoot": "projects/components/widgets/navigation/navbar/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/navigation/navbar/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/navigation/popover": {
                "root": "projects/components/widgets/navigation/popover",
                "sourceRoot": "projects/components/widgets/navigation/popover/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/navigation/popover/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/dialogs": {
                "root": "projects/components/widgets/dialogs/default",
                "sourceRoot": "projects/components/widgets/dialogs/default/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/dialogs/default/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/dialogs/alert-dialog": {
                "root": "projects/components/widgets/dialogs/alert-dialog",
                "sourceRoot": "projects/components/widgets/dialogs/alert-dialog/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/dialogs/alert-dialog/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/dialogs/confirm-dialog": {
                "root": "projects/components/widgets/dialogs/confirm-dialog",
                "sourceRoot": "projects/components/widgets/dialogs/confirm-dialog/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/dialogs/confirm-dialog/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/dialogs/design-dialog": {
                "root": "projects/components/widgets/dialogs/design-dialog",
                "sourceRoot": "projects/components/widgets/dialogs/design-dialog/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/dialogs/design-dialog/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/dialogs/iframe-dialog": {
                "root": "projects/components/widgets/dialogs/iframe-dialog",
                "sourceRoot": "projects/components/widgets/dialogs/iframe-dialog/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/dialogs/iframe-dialog/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/dialogs/login-dialog": {
                "root": "projects/components/widgets/dialogs/login-dialog",
                "sourceRoot": "projects/components/widgets/dialogs/login-dialog/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/dialogs/login-dialog/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/dialogs/partial-dialog": {
                "root": "projects/components/widgets/dialogs/partial-dialog",
                "sourceRoot": "projects/components/widgets/dialogs/partial-dialog/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/dialogs/partial-dialog/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/advanced/carousel": {
                "root": "projects/components/widgets/advanced/carousel",
                "sourceRoot": "projects/components/widgets/advanced/carousel/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/advanced/carousel/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/advanced/marquee": {
                "root": "projects/components/widgets/advanced/marquee",
                "sourceRoot": "projects/components/widgets/advanced/marquee/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/advanced/marquee/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/advanced/login": {
                "root": "projects/components/widgets/advanced/login",
                "sourceRoot": "projects/components/widgets/advanced/login/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/advanced/login/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/page": {
                "root": "projects/components/widgets/page/default",
                "sourceRoot": "projects/components/widgets/page/default/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/page/default/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/page/footer": {
                "root": "projects/components/widgets/page/footer",
                "sourceRoot": "projects/components/widgets/page/footer/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/page/footer/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/page/header": {
                "root": "projects/components/widgets/page/header",
                "sourceRoot": "projects/components/widgets/page/header/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/page/header/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/page/left-panel": {
                "root": "projects/components/widgets/page/left-panel",
                "sourceRoot": "projects/components/widgets/page/left-panel/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/page/left-panel/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/page/right-panel": {
                "root": "projects/components/widgets/page/right-panel",
                "sourceRoot": "projects/components/widgets/page/right-panel/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/page/right-panel/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/page/top-nav": {
                "root": "projects/components/widgets/page/top-nav",
                "sourceRoot": "projects/components/widgets/page/top-nav/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/page/top-nav/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/components/prefab": {
                "root": "projects/components/widgets/prefab",
                "sourceRoot": "projects/components/widgets/prefab/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/components/widgets/tsconfig.lib.json",
                            "project": "projects/components/widgets/prefab/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/components/widgets/tsconfig.lib.json",
                                "projects/components/widgets/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/transpiler": {
                "root": "projects/transpiler",
                "sourceRoot": "projects/transpiler/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/transpiler/tsconfig.lib.json",
                            "project": "projects/transpiler/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/transpiler/tsconfig.lib.json",
                                "projects/transpiler/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/security": {
                "root": "projects/security",
                "sourceRoot": "projects/security/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/security/tsconfig.lib.json",
                            "project": "projects/security/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/security/tsconfig.lib.json",
                                "projects/security/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/swipey": {
                "root": "projects/swipey",
                "sourceRoot": "projects/swipey/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/swipey/tsconfig.lib.json",
                            "project": "projects/swipey/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/swipey/tsconfig.lib.json",
                                "projects/swipey/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/http": {
                "root": "projects/http-service",
                "sourceRoot": "projects/http-service/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/http-service/tsconfig.lib.json",
                            "project": "projects/http-service/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/http-service/tsconfig.lib.json",
                                "projects/http-service/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/oAuth": {
                "root": "projects/oAuth",
                "sourceRoot": "projects/oAuth/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/oAuth/tsconfig.lib.json",
                            "project": "projects/oAuth/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/oAuth/tsconfig.lib.json",
                                "projects/oAuth/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/variables": {
                "root": "projects/variables",
                "sourceRoot": "projects/variables/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/variables/tsconfig.lib.json",
                            "project": "projects/variables/ng-package.json"
                        }
                    },
                    "test": {
                        "builder": "@angular-devkit/build-angular:karma",
                        "options": {
                            "main": "projects/variables/src/test.ts",
                            "polyfills": "projects/variables/polyfills.ts",
                            "tsConfig": "projects/variables/tsconfig.spec.json",
                            "karmaConfig": "projects/variables/karma.conf.js",
                            "styles": [],
                            "scripts": [],
                            "assets": []
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/variables/tsconfig.lib.json",
                                "projects/variables/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/core": {
                "root": "projects/mobile/core",
                "sourceRoot": "projects/mobile/core/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/core/tsconfig.lib.json",
                            "project": "projects/mobile/core/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/core/tsconfig.lib.json",
                                "projects/mobile/core/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/basic": {
                "root": "projects/mobile/components/basic/default",
                "sourceRoot": "projects/mobile/components/basic/default/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/basic/default/package.json"
                        }
                    },
                    "test": {
                        "builder": "@angular-devkit/build-angular:karma",
                        "options": {
                            "main": "projects/mobile/components/src/test.ts",
                            "polyfills": "projects/mobile/components/polyfills.ts",
                            "tsConfig": "projects/mobile/components/tsconfig.spec.json",
                            "karmaConfig": "projects/mobile/components/karma.conf.js",
                            "styles": [],
                            "scripts": [],
                            "assets": []
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/basic/search": {
                "root": "projects/mobile/components/basic/search",
                "sourceRoot": "projects/mobile/components/basic/search/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/basic/search/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/containers/segmented-control": {
                "root": "projects/mobile/components/containers/segmented-control",
                "sourceRoot": "projects/mobile/components/containers/segmented-control/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/containers/segmented-control/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/data/media-list": {
                "root": "projects/mobile/components/data/media-list",
                "sourceRoot": "projects/mobile/components/data/media-list/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/data/media-list/package.json"
                        }
                    },
                    "test": {
                        "builder": "@angular-devkit/build-angular:karma",
                        "options": {
                            "main": "projects/variables/src/test.ts",
                            "polyfills": "projects/variables/polyfills.ts",
                            "tsConfig": "projects/variables/tsconfig.spec.json",
                            "karmaConfig": "projects/variables/karma.conf.js",
                            "styles": [],
                            "scripts": [],
                            "assets": []
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/device/barcode-scanner": {
                "root": "projects/mobile/components/device/barcode-scanner",
                "sourceRoot": "projects/mobile/components/device/barcode-scanner/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/device/barcode-scanner/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/device/camera": {
                "root": "projects/mobile/components/device/camera",
                "sourceRoot": "projects/mobile/components/device/camera/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/device/camera/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/input/epoch": {
                "root": "projects/mobile/components/input/epoch",
                "sourceRoot": "projects/mobile/components/input/epoch/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/input/epoch/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/input/file-upload": {
                "root": "projects/mobile/components/input/file-upload",
                "sourceRoot": "projects/mobile/components/input/file-upload/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/input/file-upload/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/page": {
                "root": "projects/mobile/components/page",
                "sourceRoot": "projects/mobile/components/page/default/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/page/default/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/page/left-panel": {
                "root": "projects/mobile/components/page/left-panel",
                "sourceRoot": "projects/mobile/components/page/left-panel/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/page/left-panel/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/page/mobile-navbar": {
                "root": "projects/mobile/components/page/mobile-navbar",
                "sourceRoot": "projects/mobile/components/page/mobile-navbar/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/page/mobile-navbar/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/components/page/tab-bar": {
                "root": "projects/mobile/components/page/tab-bar",
                "sourceRoot": "projects/mobile/components/page/tab-bar/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/components/tsconfig.lib.json",
                            "project": "projects/mobile/components/page/tab-bar/package.json"
                        }
                    },
                    "test": {
                        "builder": "@angular-devkit/build-angular:karma",
                        "options": {
                            "main": "projects/mobile/components/src/test.ts",
                            "polyfills": "projects/mobile/components/polyfills.ts",
                            "tsConfig": "projects/mobile/components/tsconfig.spec.json",
                            "karmaConfig": "projects/mobile/components/karma.conf.js",
                            "styles": [],
                            "scripts": [],
                            "assets": []
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/components/tsconfig.lib.json",
                                "projects/mobile/components/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/offline": {
                "root": "projects/mobile/offline",
                "sourceRoot": "projects/mobile/offline/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/offline/tsconfig.lib.json",
                            "project": "projects/mobile/offline/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/offline/tsconfig.lib.json",
                                "projects/mobile/offline/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/variables": {
                "root": "projects/mobile/variables",
                "sourceRoot": "projects/mobile/variables/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/variables/tsconfig.lib.json",
                            "project": "projects/mobile/variables/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/variables/tsconfig.lib.json",
                                "projects/mobile/variables/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/runtime/base": {
                "root": "projects/runtime-base",
                "sourceRoot": "projects/runtime-base/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/runtime-base/tsconfig.lib.json",
                            "project": "projects/runtime-base/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/runtime-base/tsconfig.lib.json",
                                "projects/runtime-base/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/runtime/dynamic": {
                "root": "projects/runtime-dynamic",
                "sourceRoot": "projects/runtime-dynamic/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/runtime-dynamic/tsconfig.lib.json",
                            "project": "projects/runtime-dynamic/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/runtime-dynamic/tsconfig.lib.json",
                                "projects/runtime-dynamic/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/runtime": {
                "root": "projects/mobile/runtime",
                "sourceRoot": "projects/mobile/runtime/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/runtime/tsconfig.lib.json",
                            "project": "projects/mobile/runtime/ng-package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/runtime/tsconfig.lib.json",
                                "projects/mobile/runtime/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/runtime/dynamic": {
                "root": "projects/mobile/runtime-dynamic",
                "sourceRoot": "projects/mobile/runtime-dynamic/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/runtime-dynamic/tsconfig.lib.json",
                            "project": "projects/mobile/runtime-dynamic/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/runtime/tsconfig.lib.json",
                                "projects/mobile/runtime/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/placeholder/runtime": {
                "root": "projects/mobile/placeholder/runtime",
                "sourceRoot": "projects/mobile/placeholder/runtime/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/placeholder/tsconfig.lib.json",
                            "project": "projects/mobile/placeholder/runtime/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/placeholder/tsconfig.lib.json",
                                "projects/mobile/placeholder/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            },
            "@wm/mobile/placeholder/runtime/dynamic": {
                "root": "projects/mobile/placeholder/runtime-dynamic",
                "sourceRoot": "projects/mobile/placeholder/runtime-dynamic/src",
                "projectType": "library",
                "prefix": "lib",
                "architect": {
                    "build": {
                        "builder": "@angular-devkit/build-ng-packagr:build",
                        "options": {
                            "tsConfig": "projects/mobile/placeholder/tsconfig.lib.json",
                            "project": "projects/mobile/placeholder/runtime-dynamic/package.json"
                        }
                    },
                    "lint": {
                        "builder": "@angular-devkit/build-angular:tslint",
                        "options": {
                            "tsConfig": [
                                "projects/mobile/placeholder/tsconfig.lib.json",
                                "projects/mobile/placeholder/tsconfig.spec.json"
                            ],
                            "exclude": [
                                "**/node_modules/**"
                            ]
                        }
                    }
                }
            }
        },
        "defaultProject": "angular-app"
    }
    `,
    appModuleTemplate: ()=>`
    import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule as NgCommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import {
    AppComponent,
    AppJSProvider,
    AppVariablesProvider,
    ComponentRefProvider,
    PartialRefProvider,
    PrefabConfigProvider,
    WM_MODULES_FOR_ROOT,
    REQUIRED_MODULES_FOR_DYNAMIC_COMPONENTS
} from '@wm/runtime/base';


// import { routes } from './app.routes';
import { routes } from './sspa_app.routes';

import { AppJSProviderService } from '../framework/services/app-js-provider.service';
import { AppVariablesProviderService } from '../framework/services/app-variables-provider.service';
import { ComponentRefProviderService } from '../framework/services/component-ref-provider.service';
import { PrefabConfigProviderService } from '../framework/services/prefab-config-provider.service';
import { AppCodeGenModule, xsrfHeaderName } from './app-codegen.module';
import { LazyLoadScriptsResolve } from './lazy-load-scripts.resolve';
import { initPrefabConfig } from './prefabs/prefab-config';
import { Observable } from 'rxjs';

export const modalModule = ModalModule.forRoot();
export const routerModule = RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'top'});
export const toastrModule = ToastNoAnimationModule.forRoot({maxOpened: 1, autoDismiss: true });
export const bsDatePickerModule: ModuleWithProviders = BsDatepickerModule.forRoot();
export const httpClientXsrfModule = HttpClientXsrfModule.withOptions({
    cookieName: 'wm_xsrf_token',
    headerName: xsrfHeaderName
});

export const ngCircleProgressModule: ModuleWithProviders = NgCircleProgressModule.forRoot({});


export const isPrefabInitialized = initPrefabConfig();

@NgModule({
    imports:[RouterModule.forRoot(routes,{useHash:true, scrollPositionRestoration:'top'})],
    exports:[RouterModule],
    providers:[{provide:APP_BASE_HREF, useValue:"/"}]
})
export class AppRoutingModule{};

@Injectable()
export class WMInterceptor implements HttpInterceptor {
    intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
        // const baseUrl = 'http://localhost:8080/wmapp/';
        return next.handle(request.clone({url:deployUrl+'/'+request.url}))
    }
}

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        NgCommonModule,
        HttpClientModule,
        AppRoutingModule,
        modalModule,
        ngCircleProgressModule,
        toastrModule,
        httpClientXsrfModule,
        bsDatePickerModule,
        WM_MODULES_FOR_ROOT,
        AppCodeGenModule,
        {{PAGE_REPLACE_MODULE}}
    ],
    providers: [
        {provide: AppJSProvider, useClass: AppJSProviderService},
        {provide: AppVariablesProvider, useClass: AppVariablesProviderService},
        {provide: ComponentRefProvider, useClass: ComponentRefProviderService},
        {provide: PartialRefProvider, useClass: ComponentRefProviderService},
        {provide: PrefabConfigProvider, useClass: PrefabConfigProviderService},
        {provide: HTTP_INTERCEPTORS, useClass:WMInterceptor, multi: true},
        LazyLoadScriptsResolve
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
    `
}