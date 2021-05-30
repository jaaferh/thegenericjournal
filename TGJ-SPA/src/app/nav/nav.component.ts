import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit {
  @ViewChild('navbar') navbar!: ElementRef;
  @HostListener('window:scroll', ['$event'])
    scrollHandler(event: any) {
      this.checkSticky();
    }
  stick = false;
  showNav = true;
  navbarTopOffset = 0;
  constructor() { }

  ngAfterViewInit(): void {
    const navBarNativElement = this.navbar.nativeElement as Element;
    this.navbarTopOffset = navBarNativElement.getBoundingClientRect().top;  
  }

  checkSticky(): void {
    this.stick = window.pageYOffset > this.navbarTopOffset ? true : false;
  }

  toggleShowNav(): void {
    this.showNav = !this.showNav;
  }

}
