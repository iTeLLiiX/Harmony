package com.harmony

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.harmony.ui.theme.HarmonyTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            HarmonyTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    HarmonyApp()
                }
            }
        }
    }
}

@Composable
fun HarmonyApp() {
    val navController = rememberNavController()
    
    NavHost(
        navController = navController,
        startDestination = "landing"
    ) {
        composable("landing") {
            LandingScreen(navController = navController)
        }
        composable("login") {
            LoginScreen(navController = navController)
        }
        composable("register") {
            RegisterScreen(navController = navController)
        }
        composable("onboarding") {
            OnboardingScreen(navController = navController)
        }
        composable("matching") {
            MatchingScreen(navController = navController)
        }
        composable("chat") {
            ChatScreen(navController = navController)
        }
        composable("profile") {
            ProfileScreen(navController = navController)
        }
        composable("premium") {
            PremiumScreen(navController = navController)
        }
        composable("events") {
            EventsScreen(navController = navController)
        }
        composable("analytics") {
            AnalyticsScreen(navController = navController)
        }
    }
}

@Composable
fun LandingScreen(navController: androidx.navigation.NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "💕 Harmony",
            fontSize = 48.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFFC80026)
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Wir stehen für Liebe",
            fontSize = 24.sp,
            fontWeight = FontWeight.Medium
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Text(
            text = "Finde deine große Liebe basierend auf Persönlichkeit und gemeinsamen Interessen",
            fontSize = 16.sp,
            color = Color.Gray
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        Button(
            onClick = { navController.navigate("register") },
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFC80026)
            )
        ) {
            Text(
                text = "Jetzt kostenlos registrieren",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        OutlinedButton(
            onClick = { navController.navigate("login") },
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
        ) {
            Text(
                text = "Anmelden",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
        }
        
        Spacer(modifier = Modifier.height(32.dp))
        
        Text(
            text = "50.000+ Downloads",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFFC80026)
        )
    }
}

@Composable
fun LoginScreen(navController: androidx.navigation.NavController) {
    var phone by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "💕 Harmony",
            fontSize = 36.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFFC80026)
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        OutlinedTextField(
            value = phone,
            onValueChange = { phone = it },
            label = { Text("Handynummer") },
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Passwort") },
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        Button(
            onClick = { navController.navigate("matching") },
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFC80026)
            )
        ) {
            Text(
                text = "Anmelden",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        TextButton(
            onClick = { navController.navigate("register") }
        ) {
            Text("Noch kein Konto? Registrieren")
        }
    }
}

@Composable
fun RegisterScreen(navController: androidx.navigation.NavController) {
    var phone by remember { mutableStateOf("") }
    var name by remember { mutableStateOf("") }
    var age by remember { mutableStateOf("") }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Registrierung",
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        OutlinedTextField(
            value = phone,
            onValueChange = { phone = it },
            label = { Text("Handynummer") },
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Name") },
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        OutlinedTextField(
            value = age,
            onValueChange = { age = it },
            label = { Text("Alter") },
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        Button(
            onClick = { navController.navigate("onboarding") },
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFC80026)
            )
        ) {
            Text(
                text = "Registrieren",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
fun OnboardingScreen(navController: androidx.navigation.NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "📸 Profil vervollständigen",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Lade deine besten Fotos hoch und erzähl etwas über dich",
            fontSize = 16.sp,
            color = Color.Gray
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        Button(
            onClick = { navController.navigate("matching") },
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFC80026)
            )
        ) {
            Text(
                text = "Fotos hinzufügen",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
fun MatchingScreen(navController: androidx.navigation.NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "💕 Entdecke neue Menschen",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(400.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = "Sarah, 28",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Text(
                    text = "Liebe Musik, Reisen und gutes Essen",
                    fontSize = 16.sp,
                    color = Color.Gray
                )
                
                Spacer(modifier = Modifier.height(16.dp))
                
                Text(
                    text = "Match-Score: 85%",
                    fontSize = 14.sp,
                    color = Color(0xFF4CAF50)
                )
            }
        }
        
        Spacer(modifier = Modifier.height(32.dp))
        
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Button(
                onClick = { /* Dislike */ },
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.Red
                )
            ) {
                Text("❌")
            }
            
            Button(
                onClick = { /* Super Like */ },
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.Blue
                )
            ) {
                Text("⭐")
            }
            
            Button(
                onClick = { /* Like */ },
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFF4CAF50)
                )
            ) {
                Text("❤️")
            }
        }
    }
}

@Composable
fun ChatScreen(navController: androidx.navigation.NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "💬 Chats",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Hier findest du deine Matches und kannst mit ihnen chatten",
            fontSize = 16.sp,
            color = Color.Gray
        )
    }
}

@Composable
fun ProfileScreen(navController: androidx.navigation.NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "👤 Profil",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Verwalte dein Profil und deine Einstellungen",
            fontSize = 16.sp,
            color = Color.Gray
        )
    }
}

@Composable
fun PremiumScreen(navController: androidx.navigation.NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "💎 Premium",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Entdecke alle Premium-Features",
            fontSize = 16.sp,
            color = Color.Gray
        )
    }
}

@Composable
fun EventsScreen(navController: androidx.navigation.NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "📅 Events",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Entdecke lokale Events und triff neue Menschen",
            fontSize = 16.sp,
            color = Color.Gray
        )
    }
}

@Composable
fun AnalyticsScreen(navController: androidx.navigation.NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "📊 Analytics",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Verstehe deine Performance und optimiere dein Profil",
            fontSize = 16.sp,
            color = Color.Gray
        )
    }
}
