import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:lottie/lottie.dart';
import 'dart:async';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Canteen',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.light,
        primarySwatch: Colors.deepPurple,
        scaffoldBackgroundColor: Colors.grey[100],
      ),
      home: const SplashScreen(),
    );
  }
}

/// Splash Screen with Lottie animation
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const HomePage()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Lottie.asset("assets/splash.json", width: 250, height: 250),
      ),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late final WebViewController _controller;
  bool isLoading = true;
  double progressValue = 0.0;
  bool hasConnection = true;
  late StreamSubscription<ConnectivityResult> connectivitySubscription;

  @override
  void initState() {
    super.initState();
    _initConnectivity();
    _initWebView();
  }

  void _initConnectivity() {
    connectivitySubscription = Connectivity().onConnectivityChanged.listen((
      result,
    ) {
      setState(() {
        hasConnection = result != ConnectivityResult.none;
      });

      if (hasConnection && !isLoading) {
        _controller.reload();
      }
    });
  }

  void _initWebView() {
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.transparent)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) {
            setState(() {
              isLoading = true;
              progressValue = 0.0;
            });
          },
          onProgress: (progress) {
            setState(() {
              progressValue = progress / 100.0;
            });
          },
          onPageFinished: (_) {
            setState(() {
              isLoading = false;
              progressValue = 0.0;
            });
          },
          onWebResourceError: (error) {
            setState(() {
              hasConnection = false;
            });
          },
        ),
      )
      ..loadRequest(Uri.parse("https://hackethong1.web.app/"));
  }

  Future<bool> _onWillPop() async {
    if (await _controller.canGoBack()) {
      _controller.goBack();
      return false;
    }
    return true;
  }

  void _retryConnection() async {
    final connectivityResult = await Connectivity().checkConnectivity();
    setState(() {
      hasConnection = connectivityResult != ConnectivityResult.none;
    });

    if (hasConnection) {
      _controller.reload();
    }
  }

  @override
  void dispose() {
    connectivitySubscription.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onWillPop,
      child: Scaffold(
        body: hasConnection
            ? RefreshIndicator(
                color: Colors.deepPurple,
                onRefresh: () async {
                  _controller.reload();
                },
                child: Stack(
                  children: [
                    WebViewWidget(controller: _controller),
                    if (isLoading)
                      Center(
                        child: Lottie.asset(
                          "assets/loading.json",
                          width: 150,
                          height: 150,
                        ),
                      ),
                  ],
                ),
              )
            : NoInternetScreen(onRetry: _retryConnection),
        bottomNavigationBar: hasConnection
            ? BottomNavigationBar(
                backgroundColor: Colors.white,
                selectedItemColor: Colors.deepPurple,
                unselectedItemColor: Colors.grey,
                elevation: 8,
                items: const [
                  BottomNavigationBarItem(
                    icon: Icon(Icons.home),
                    label: "Home",
                  ),
                  BottomNavigationBarItem(
                    icon: Icon(Icons.fastfood),
                    label: "Menu",
                  ),
                  BottomNavigationBarItem(
                    icon: Icon(Icons.shopping_cart),
                    label: "Orders",
                  ),
                ],
                onTap: (index) {
                  if (index == 0) {
                    _controller.loadRequest(
                      Uri.parse("https://hackethong1.web.app/"),
                    );
                  } else if (index == 1) {
                    _controller.loadRequest(
                      Uri.parse("https://hackethong1.web.app/menu"),
                    );
                  } else if (index == 2) {
                    _controller.loadRequest(
                      Uri.parse("https://hackethong1.web.app/orders"),
                    );
                  }
                },
              )
            : null,
        floatingActionButton: hasConnection
            ? FloatingActionButton(
                onPressed: () => _controller.reload(),
                backgroundColor: Colors.deepPurple,
                child: const Icon(Icons.refresh, color: Colors.white),
              )
            : null,
      ),
    );
  }
}

/// Custom No Internet Screen
class NoInternetScreen extends StatelessWidget {
  final VoidCallback onRetry;

  const NoInternetScreen({super.key, required this.onRetry});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Lottie.asset("assets/no_internet.json", width: 250, height: 250),
            const SizedBox(height: 20),
            const Text(
              'No Internet Connection',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Colors.deepPurple,
              ),
            ),
            const SizedBox(height: 10),
            const Text(
              'Please check your connection and try again.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: onRetry,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.deepPurple,
                padding: const EdgeInsets.symmetric(
                  horizontal: 40,
                  vertical: 15,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
              ),
              child: const Text(
                'Retry',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
