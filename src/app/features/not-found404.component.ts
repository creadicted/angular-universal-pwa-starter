import { Component } from '@angular/core';

import { TitleAndMetaTags } from '@interfaces/title-and-meta-tags.interface';

import { SEOService } from '@services/seo.service';

@Component({
    selector: 'app-not-found',
    template: '<h3 class="center-everything">Error 404: Not found</h3>',
})
export class NotFound404Component {
    titleAndMetaTags = {
        title: 'Angular Universal PWA Starter - 404',
        description: 'This is the 404 page. You have entered an invalid url.',
        url: 'https://universal-demo.ereckgordon.com/404',
    };

    constructor(private seoService: SEOService) {
        this.seoService.setTitleAndMetaTags(this.titleAndMetaTags);
    }
}
