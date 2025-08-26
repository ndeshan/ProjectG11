import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:lottie/lottie.dart';
import 'package:liquid_pull_to_refresh/liquid_pull_to_refresh.dart';
import 'package:glassmorphism/glassmorphism.dart';
import 'package:shimmer/shimmer.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  // Edge-to-edge immersive
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      systemNavigationBarColor: Colors.transparent,
      systemNavigationBarDividerColor: Colors.transparent,
    ),
  );
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
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
        useMaterial3: true,
        brightness: Brightness.light,
        colorSchemeSeed: Colors.deepPurple,
        scaffoldBackgroundColor: Colors.grey[100],
      ),
      home: const SplashScreen(),
    );
  }
}

/* ---------- Splash ---------- */
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
      Navigator.of(context).pushReplacement(
        PageRouteBuilder(
          pageBuilder: (_, __, ___) => const HomePage(),
          transitionsBuilder: (_, anim, __, child) =>
              FadeTransition(opacity: anim, child: child),
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Hero(
          tag: 'logo',
          child: Lottie.asset(
            "assets/splash.json",
            width: 250,
            height: 250,
            fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }
}

/* ---------- Home ---------- */
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late final WebViewController _controller;
  bool isLoading = true;
  bool hasConnection = true;
  bool showChip = false;

  // updated: now StreamSubscription<List<ConnectivityResult>>
  late StreamSubscription<List<ConnectivityResult>> _subscription;

  @override
  void initState() {
    super.initState();
    _initConnectivity();
    _initWebView();
  }

  void _initConnectivity() {
    _subscription = Connectivity().onConnectivityChanged.listen((results) {
      final result = results.isNotEmpty
          ? results.first
          : ConnectivityResult.none;
      setState(() {
        hasConnection = result != ConnectivityResult.none;
        showChip = true;
      });
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted) setState(() => showChip = false);
      });
      if (hasConnection && !isLoading) _controller.reload();
    });
  }

  void _initWebView() {
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.transparent)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) => setState(() => isLoading = true),
          onProgress: (p) {},
          onPageFinished: (_) => setState(() => isLoading = false),
          onWebResourceError: (_) => setState(() => hasConnection = false),
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
    final res = await Connectivity().checkConnectivity();
    setState(
      () => hasConnection =
          res.isNotEmpty && res.first != ConnectivityResult.none,
    );
    if (hasConnection) _controller.reload();
  }

  @override
  void dispose() {
    _subscription.cancel();
    super.dispose();
  }

  /* ---------- Build ---------- */
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onWillPop,
      child: Scaffold(
        extendBody: true,
        body: hasConnection
            ? _buildWebView()
            : NoInternetScreen(onRetry: _retryConnection),
        bottomNavigationBar: hasConnection ? _glassBottomBar() : null,
        floatingActionButton: hasConnection ? _glassFAB() : null,
      ),
    );
  }

  /* ---------- WebView with pull-to-refresh ---------- */
  Widget _buildWebView() {
    return Stack(
      children: [
        LiquidPullToRefresh(
          color: Colors.deepPurple,
          // removed animSpeedMultiplier (not available in v3+)
          onRefresh: () async => _controller.reload(),
          child: WebViewWidget(controller: _controller),
        ),
        if (isLoading)
          Shimmer.fromColors(
            baseColor: Colors.deepPurple.shade100,
            highlightColor: Colors.white,
            child: Container(color: Colors.white),
          ),
        // Connection status chip
        AnimatedPositioned(
          duration: const Duration(milliseconds: 400),
          curve: Curves.easeOut,
          top: showChip ? 70 : -100,
          left: 0,
          right: 0,
          child: Center(
            child: Chip(
              backgroundColor: hasConnection
                  ? Colors.greenAccent.shade100
                  : Colors.redAccent.shade100,
              label: Text(
                hasConnection ? 'Back online 🎉' : 'Offline 😵‍💫',
                style: const TextStyle(
                  color: Colors.black87,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  /* ---------- Glass BottomBar ---------- */
  Widget _glassBottomBar() {
    return GlassmorphicContainer(
      width: double.infinity,
      height: 70,
      borderRadius: 25,
      blur: 20,
      alignment: Alignment.center,
      border: 1.5,
      linearGradient: LinearGradient(
        colors: [
          Colors.white.withOpacity(0.25),
          Colors.white.withOpacity(0.15),
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      borderGradient: LinearGradient(
        colors: [
          Colors.deepPurple.shade200.withOpacity(0.4),
          Colors.deepPurple.shade100.withOpacity(0.2),
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      child: BottomNavigationBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        selectedItemColor: Colors.deepPurple.shade800,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.fastfood), label: "Menu"),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart),
            label: "Orders",
          ),
        ],
        onTap: (i) {
          final url = [
            "https://hackethong1.web.app/",
            "https://hackethong1.web.app/menu",
            "https://hackethong1.web.app/orders",
          ][i];
          _controller.loadRequest(Uri.parse(url));
        },
      ),
    );
  }

  /* ---------- Glass FAB ---------- */
  Widget _glassFAB() {
    return GlassmorphicContainer(
      width: 56,
      height: 56,
      borderRadius: 28,
      blur: 20,
      border: 1.5,
      linearGradient: LinearGradient(
        colors: [
          Colors.deepPurple.withOpacity(0.35),
          Colors.deepPurple.withOpacity(0.25),
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      borderGradient: LinearGradient(
        colors: [
          Colors.deepPurple.shade200.withOpacity(0.4),
          Colors.deepPurple.shade100.withOpacity(0.2),
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      child: FloatingActionButton(
        onPressed: () => _controller.reload(),
        backgroundColor: Colors.transparent,
        elevation: 0,
        child: const Icon(Icons.refresh, color: Colors.white),
      ),
    );
  }
}

/* ---------- No Internet ---------- */
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
                style: TextStyle(color: Colors.white, fontSize: 16),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
