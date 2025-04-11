import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private selectedFeedSubject: BehaviorSubject<{ slug: string; key: string }> = new BehaviorSubject<{ slug: string; key: string }>({
    slug: '',
    key: ''
  });
  selectedFeed$ = this.selectedFeedSubject.asObservable();

  setFeed(feed: { slug: string; key: string }) {
    localStorage.setItem('selectedFeed', JSON.stringify(feed));
    this.selectedFeedSubject.next(feed);
  }

  getFeed() {
    return this.selectedFeedSubject.value;
  }
}
