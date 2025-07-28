#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

class Node {
public:
    unordered_map<char, Node*> hm;
    bool isEnd;

    Node() {
        isEnd = false;
    }
};

// You will need to implement these two functions as well
void insert(Node* root, const string& word) {//l*o(1)
    int n = word.length();
    for (int i = 0; i < n; i++) {
        char ch = word[i];
        if (root->hm.count(ch)) {
            root = root->hm[ch];
        } else {
            Node* temp = new Node();
            root->hm[ch] = temp;
            root = temp;
        }
    }
    root->isEnd = true; // Mark end of word
}

bool search(Node* root, const string& word){//l*o(1)
    int n = word.length();
    for (int i = 0; i < n; i++) {
        char ch = word[i];
        if (root->hm.count(ch)) {
            root = root->hm[ch];
        } else {
            return false;
        }
    }
    return root->isEnd; 

}

void data(vector<string> inp, vector<string> que) {
    Node* root = new Node();
    int n = inp.size();
    for (int i = 0; i < n; i++) {
        insert(root, inp[i]);
    }

    int q = que.size();
    for (int i = 0; i < q; i++) {
        if (search(root, que[i])) {
            cout << "Present" << endl;
        } else {
            cout << "Not Present" << endl;
        }
    }
}
