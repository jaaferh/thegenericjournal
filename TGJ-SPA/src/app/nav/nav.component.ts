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
  navbarTopOffset = 0;
  constructor() { }

  // ngOnInit(): void {
  //   console.log(this.navbar.nativeElement.getBoundingClientRect());
  // }

  ngAfterViewInit(): void {
    this.navbarTopOffset = this.navbar.nativeElement.getBoundingClientRect().top;
  }

  checkSticky(): void {
    // const navbarTopOffset = this.navbar.nativeElement.getBoundingClientRect().top;
    this.stick = window.pageYOffset > this.navbarTopOffset ? true : false;
    console.log('window ' + window.pageYOffset);
    console.log('navbar ' + this.navbarTopOffset);
    // console.log(this.stick);
  }

  

}
