import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'logging',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logging.component.html',
  styleUrl: './logging.component.css',
})
export class LoggingComponent implements OnInit {
  constructor(public loggingService: LoggingService) {}
  ngOnInit() {}
}
