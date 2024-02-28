import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <!--
      <a href="/">
        <img
          src="./assets/images/logos/dark-logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
       -->
       <h2 class="font-bold text-2xl">
  <span class="text-blue-600 font-bold">CHRONO</span>
  <span class=" inherit-color font-bold">PACK</span>
</h2>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
