<?php
$categories = [
    [
        'title' => 'Our Cute Photo Collage',
        'description' => 'Tap to open a sweet collage page with your favorite photos together.',
        'link' => 'collage.php',
        'emoji' => '📸'
    ],
    [
        'title' => 'My Valentine Message',
        'description' => 'A long heartfelt message with extra-cute vibes and stickers.',
        'link' => 'message.php',
        'emoji' => '💌'
    ],
    [
        'title' => 'Gifts, Toys & Flower Drawing',
        'description' => 'Fun interactive ideas and tiny surprises for your love.',
        'link' => 'gifts.php',
        'emoji' => '🎁'
    ]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Valentine Card</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Nunito:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <main class="page-shell">
        <div class="floating-stickers" aria-hidden="true">
            <span>💖</span><span>🌹</span><span>✨</span><span>🧸</span><span>💘</span>
        </div>

        <section class="card-scene">
            <article class="valentine-card" id="valentineCard" aria-label="Valentine greeting card">
                <div class="card-lid" id="cardLid">
                    <h1>Open Me, Babyyy 💕</h1>
                    <p>Click to reveal your Valentine surprise.</p>
                </div>
                <div class="card-content" id="cardContent">
                    <h2>Happy Valentine's Day, My Bebiiii! 🌷</h2>
                    <p>
                        You are my favorite hello and my hardest goodbye.
                        I made this little website just for us.
                    </p>
                    <p class="soft-note">Choose one of our sweet sections below:</p>
                </div>
            </article>
        </section>

        <section class="category-section" id="categorySection" aria-label="Valentine categories">
            <?php foreach ($categories as $item): ?>
                <a class="category-card" href="<?php echo htmlspecialchars($item['link']); ?>">
                    <div class="category-emoji"><?php echo $item['emoji']; ?></div>
                    <h3><?php echo htmlspecialchars($item['title']); ?></h3>
                    <p><?php echo htmlspecialchars($item['description']); ?></p>
                    <span class="btn-like">Open</span>
                </a>
            <?php endforeach; ?>
        </section>
    </main>

    <script src="assets/script.js"></script>
</body>
</html>
