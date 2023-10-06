import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceSizeFinderService {

  private isPhonePortrait: boolean;
  private isPhoneLandscape: boolean;
  private isTabletPortrait: boolean;
  private isTabletLandscape: boolean;

  constructor(private responsive: BreakpointObserver) {
    this.resetSizes();
    this.determineDeviceSize();
  }

  private determineDeviceSize(){
    this.responsive.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape])
      .subscribe(result => {
        this.resetSizes();
        const breakpoints = result.breakpoints;
        if (breakpoints[Breakpoints.HandsetPortrait]){
          this.isPhonePortrait = true;
        }
        else if (breakpoints[Breakpoints.HandsetLandscape]){
          this.isPhoneLandscape = true;
        }
        else if (breakpoints[Breakpoints.TabletPortrait]){
          this.isTabletPortrait = true;
        }
        else if (breakpoints[Breakpoints.TabletLandscape]){
          this.isTabletLandscape = true;
        }
    });
  }
  
  private resetSizes(){
    this.isPhonePortrait = false;
    this.isPhoneLandscape = false;
    this.isTabletPortrait = false;
    this.isTabletLandscape = false;
  }

  public getIsPhonePortrait(){
    return this.isPhonePortrait;
  }

  public getIsPhoneLandscape(){
    return this.isPhoneLandscape;
  }

  public getIsTabletPortrait(){
    return this.isTabletPortrait;
  }

  public getIsTabletLandscape(){
    return this.isTabletLandscape;
  }
}
