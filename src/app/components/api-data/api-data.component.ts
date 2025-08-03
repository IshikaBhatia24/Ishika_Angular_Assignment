import { Component, OnInit } from '@angular/core';
import { ApiService, Post } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api-data',
  template: `
    <div class="api-data-container">
      <h1>API Data from JSONPlaceholder</h1>
      <p>This page demonstrates consuming data from a public API.</p>
      
      <button (click)="loadPosts()" class="load-btn">Load Posts</button>
      
      <div *ngIf="loading" class="loading">Loading...</div>
      
      <div *ngIf="posts.length > 0" class="posts-container">
        <div *ngFor="let post of posts.slice(0, 10)" class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
          <small>User ID: {{ post.userId }} | Post ID: {{ post.id }}</small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .api-data-container {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      color: #333;
      text-align: center;
    }
    .load-btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      margin-bottom: 2rem;
    }
    .load-btn:hover {
      background-color: #0056b3;
    }
    .loading {
      text-align: center;
      font-size: 1.2rem;
      color: #666;
    }
    .posts-container {
      display: grid;
      gap: 1rem;
    }
    .post-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      background-color: #f9f9f9;
    }
    .post-card h3 {
      margin-top: 0;
      color: #333;
    }
    .post-card small {
      color: #666;
    }
  `]
})
export class ApiDataComponent implements OnInit {
  posts: Post[] = [];
  loading = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      }
    });
  }
}