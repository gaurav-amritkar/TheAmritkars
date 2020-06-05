import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli' },
          { name: 'Brussels sprouts' },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins' },
          { name: 'Carrots' },
        ]
      },
    ]
  },
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  u: any;
  c: any;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

    this.angularFireAuth.user.subscribe(res => {
      if (res === null) {
        window.location.assign('/login');
        this.snackBar.open('User is not Authenticated', 'Dismiss', { duration: 2000 });
      } else {
        this.u = res.phoneNumber;
      }
    });

    this.dataSource.data = TREE_DATA;
    // this.u = JSON.parse(localStorage.getItem('USER'));
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}