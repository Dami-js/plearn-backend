'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">plearn-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-90b1dc955b9c6ce9ff5fd67c32fc7e30"' : 'data-target="#xs-controllers-links-module-AppModule-90b1dc955b9c6ce9ff5fd67c32fc7e30"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-90b1dc955b9c6ce9ff5fd67c32fc7e30"' :
                                            'id="xs-controllers-links-module-AppModule-90b1dc955b9c6ce9ff5fd67c32fc7e30"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-90b1dc955b9c6ce9ff5fd67c32fc7e30"' : 'data-target="#xs-injectables-links-module-AppModule-90b1dc955b9c6ce9ff5fd67c32fc7e30"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-90b1dc955b9c6ce9ff5fd67c32fc7e30"' :
                                        'id="xs-injectables-links-module-AppModule-90b1dc955b9c6ce9ff5fd67c32fc7e30"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-7e6d55d851651cc6627bd9ce51b0c7f4"' : 'data-target="#xs-injectables-links-module-AuthModule-7e6d55d851651cc6627bd9ce51b0c7f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7e6d55d851651cc6627bd9ce51b0c7f4"' :
                                        'id="xs-injectables-links-module-AuthModule-7e6d55d851651cc6627bd9ce51b0c7f4"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FeedModule.html" data-type="entity-link">FeedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FeedModule-91f7f5e2c059def0132686efc47baafe"' : 'data-target="#xs-controllers-links-module-FeedModule-91f7f5e2c059def0132686efc47baafe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FeedModule-91f7f5e2c059def0132686efc47baafe"' :
                                            'id="xs-controllers-links-module-FeedModule-91f7f5e2c059def0132686efc47baafe"' }>
                                            <li class="link">
                                                <a href="controllers/FeedController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeedController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FeedModule-91f7f5e2c059def0132686efc47baafe"' : 'data-target="#xs-injectables-links-module-FeedModule-91f7f5e2c059def0132686efc47baafe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FeedModule-91f7f5e2c059def0132686efc47baafe"' :
                                        'id="xs-injectables-links-module-FeedModule-91f7f5e2c059def0132686efc47baafe"' }>
                                        <li class="link">
                                            <a href="injectables/FeedService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FeedService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaginateModel.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PaginateModel</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-c3845a533c33cb0d53e59af7e76fd304"' : 'data-target="#xs-controllers-links-module-UserModule-c3845a533c33cb0d53e59af7e76fd304"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-c3845a533c33cb0d53e59af7e76fd304"' :
                                            'id="xs-controllers-links-module-UserModule-c3845a533c33cb0d53e59af7e76fd304"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-c3845a533c33cb0d53e59af7e76fd304"' : 'data-target="#xs-injectables-links-module-UserModule-c3845a533c33cb0d53e59af7e76fd304"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-c3845a533c33cb0d53e59af7e76fd304"' :
                                        'id="xs-injectables-links-module-UserModule-c3845a533c33cb0d53e59af7e76fd304"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Feed.html" data-type="entity-link">Feed</a>
                            </li>
                            <li class="link">
                                <a href="classes/JoiValidationPipe.html" data-type="entity-link">JoiValidationPipe</a>
                            </li>
                            <li class="link">
                                <a href="classes/Material.html" data-type="entity-link">Material</a>
                            </li>
                            <li class="link">
                                <a href="classes/Student.html" data-type="entity-link">Student</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tutor.html" data-type="entity-link">Tutor</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link">JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtConfigService.html" data-type="entity-link">JwtConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link">LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MongooseConfigService.html" data-type="entity-link">MongooseConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link">MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginateModel.html" data-type="entity-link">PaginateModel</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGaurd.html" data-type="entity-link">RolesGaurd</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Author.html" data-type="entity-link">Author</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CollationDocument.html" data-type="entity-link">CollationDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Course.html" data-type="entity-link">Course</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateFeedDTO.html" data-type="entity-link">CreateFeedDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateStudentDto.html" data-type="entity-link">CreateStudentDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateTutorDto.html" data-type="entity-link">CreateTutorDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Feed.html" data-type="entity-link">Feed</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FetchArg.html" data-type="entity-link">FetchArg</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFeedController.html" data-type="entity-link">IFeedController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFeedService.html" data-type="entity-link">IFeedService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Learner.html" data-type="entity-link">Learner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginateModelArgs.html" data-type="entity-link">PaginateModelArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginateOptions.html" data-type="entity-link">PaginateOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationResult.html" data-type="entity-link">PaginationResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PopulateOptions.html" data-type="entity-link">PopulateOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuestionnaireBody.html" data-type="entity-link">QuestionnaireBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Todo.html" data-type="entity-link">Todo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});