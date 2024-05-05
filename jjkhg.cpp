// #include <bits/stdc++.h>
// using namespace std;
// int UCS(int src, int &goal, unordered_map<int, list<int>> &adj, map<pair<int, int>, int> &edgeCosts)
// {
//     vector<int> ans;
//     priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> qe;
//     unordered_map<int, int> visited;
//     qe.push({0, src});

//     while (!qe.empty())
//     {
//         int node = qe.top().second;
//         int dist = qe.top().first;
//         qe.pop();

//         cout << node << " ";

//         if (node == goal)
//             return dist;

//         if (!visited[node])
//         {
//             for (auto nbr : adj[node])
//             {
//                 if (!visited[nbr])
//                     qe.push({dist + edgeCosts[{node, nbr}], nbr});
//             }
//             visited[node] = true;
//         }
//     }
//     return -1;
// }
// int main()
// {
//     int n;
//     cout << "Enter the number of nodes: ";
//     cin >> n;
//     unordered_map<int, list<int>> adj;
//     map<pair<int, int>, int> edgeCosts;
//     int edges;
//     cout << "Enter the number of edges: ";
//     cin >> edges;
//     int directed;
//     cout << "Directed or undirected graph? (1/0): ";
//     cin >> directed;
//     cout << "Enter edges with cost:" << endl;
//     for (int i = 0; i < edges; ++i)
//     {
//         int u, v, cost;
//         cin >> u >> v >> cost;
//         adj[u].push_back(v);
//         if (!directed)
//         {
//             adj[v].push_back(u);
//             edgeCosts[{v, u}] = cost;
//         }
//         edgeCosts[{u, v}] = cost;
//     }

//     cout << "Enter goal nodes:" << endl;

//     int x;
//     cin >> x;

//     int answer = UCS(0, x, adj, edgeCosts);

//     cout << answer;
//     return 0;
// }

// 0 1 5
// 0 2 9
// 0 4 6
// 1 20 9
// 1 2 3
// 2 1 2
// 2 3 1
// 3 0 6
// 3 30 5
// 3 6 7
// 4 3 2
// 4 0 1
// 4 5 2
// 5 40 7
// 6 4 2
// 6 40 8

// #include <bits/stdc++.h>
// using namespace std;
// void BestFirstSearch(int src, int &goal, unordered_map<int, list<int>> &adj, vector<int> &nodeCost)
// {
//     vector<int> ans;
//     priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> qe;
//     unordered_map<int, int> visited;
//     qe.push({nodeCost[src], src});

//     while (!qe.empty())
//     {
//         int node = qe.top().second;
//         int dist = qe.top().first;
//         qe.pop();

//         cout << node << "->";
//         if (node == goal)
//             return;

//         if (!visited[node])
//         {
//             for (auto nbr : adj[node])
//             {
//                 if (!visited[nbr])
//                     qe.push({nodeCost[nbr], nbr});
//             }
//             visited[node] = true;
//         }
//     }
// }
// int main()
// {
//     int n;
//     cout << "Enter the number of nodes: ";
//     cin >> n;
//     unordered_map<int, list<int>> adj;
//     vector<int> nodeCost(n, 0);
//     int edges;
//     cout << "Enter the number of edges: ";
//     cin >> edges;
//     int directed;
//     cout << "Directed or undirected graph? (1/0): ";
//     cin >> directed;
//     cout << "Enter edges:" << endl;
//     for (int i = 0; i < edges; ++i)
//     {
//         int u, v;
//         cin >> u >> v;
//         adj[u].push_back(v);
//         if (!directed)
//         {
//             adj[v].push_back(u);
//         }
//     }

//     cout << "Enter heuristic cost:" << endl;
//     for (int i = 1; i < n + 1; ++i)
//     {
//         int cost;
//         cin >> cost;
//         nodeCost[i] = cost;
//     }

//     cout << "Enter goal node:" << endl;

//     int x;
//     cin >> x;

//     BestFirstSearch(1, x, adj, nodeCost);

//     return 0;
// }

// 1 2
// 1 3
// 1 4
// 2 10
// 3 5
// 3 8
// 3 2
// 4 5
// 5 6
// 5 8
// 6 7
// 7 9
// 8 7
// 8 9
// 10 9
// 10 8

// 10 8 6 11 9 9 6 4 0 3

#include <bits/stdc++.h>
using namespace std;
const int INF = 1e9;
int main()
{
    int n;
    cout << "Enter the number of nodes: ";
    cin >> n;
    vector<pair<int, int>> adj[n];
    vector<int> nodeCosts(n, 0);
    int edges;
    cout << "Enter the number of edges: ";
    cin >> edges;
    int directed;
    cout << "Directed or undirected graph? (1/0): ";
    cin >> directed;
    cout << "Enter edges and their costs:" << endl;
    for (int i = 0; i < edges; ++i)
    {
        int u, v, cost;
        cin >> u >> v >> cost;
        adj[u].push_back({v, cost});
        if (!directed)
        {
            adj[v].push_back({u, cost});
        }
    }
    cout << "Enter heuristic cost:" << endl;
    for (int i = 0; i < n; ++i)
    {
        int cost;
        cin >> cost;
        nodeCosts[i] = cost;
    }
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> visited(n, 0);
    vector<int> distance(n, INF);
    vector<int> parent(n, -1);
    pq.push({nodeCosts[0], 0});
    distance[0] = nodeCosts[0];
    while (!pq.empty())

    {
        int node = pq.top().second;
        pq.pop();
        if (visited[node])
            continue;
        visited[node] = 1;
        for (auto it : adj[node])

        {
            int v = it.first;
            int cost = it.second;
            if (distance[node] + cost < distance[v])

            {
                distance[v] = distance[node] + cost;
                parent[v] = node;
                pq.push({distance[v] + nodeCosts[v], v});
            }
        }
    }
    cout << "--------------------------------" << endl;
    for (int i = 0; i < n; ++i)

    {
        cout << "Path to node " << i << ": ";
        int node = i;
        stack<int> path;
        while (node !=
               -1)

        {
            path.push(node);
            node = parent[node];
        }
        while (!path.empty())

        {
            cout << path.top() << " ";
            path.pop();
        }
        cout << "- Cost : " << distance[i] << endl;
    }
    return 0;
}

// 0 1 4
// 0 2 4
// 0 3 4
// 1 9 5
// 2 4 6
// 2 7 3
// 2 1 2
// 3 4 3
// 4 5 2
// 4 7 5
// 5 6 5
// 6 8 6
// 7 6 5
// 7 8 4
// 9 8 1
// 9 7 5
