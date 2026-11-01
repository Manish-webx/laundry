<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';
require __DIR__ . '/PHPMailer/Exception.php';

// Only accept form posts; anyone opening the URL directly goes home.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /');
    exit();
}

function field($key)
{
    return trim($_POST[$key] ?? '');
}

// Form data (every form on the site posts a subset of these)
$formType   = field('form_type') ?: 'Website Form';
$name       = field('name');
$phone      = field('phone');
$email      = field('email');
$company    = field('company');
$industry   = field('industry');
$service    = field('service');
$date       = field('date');
$time       = field('time');
$address    = field('address');
$notes      = field('notes');
$message    = field('message');
$orderItems = field('order_items');
$pageUrl    = $_SERVER['HTTP_REFERER'] ?? '';

// Placeholder options from the selects are not real choices.
if ($service === 'Select a Service') $service = '';
if ($time === 'Select a Time Slot') $time = '';

// Basic validation: a lead needs a phone number, or an email for the newsletter.
if ($phone === '' && $email === '') {
    echo "<script>
        alert('Please enter your phone number or email address.');
        window.history.back();
    </script>";
    exit();
}

// Spam guard: disallow links & URLs in free-text fields
$urlPattern = '/(?:[a-zA-Z]+:\/\/|www\.)[^\s]*|(?<!@)\b[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.(?:com|org|net|in|co|io|ai|biz|info|xyz|me|online|site|tech|store|app|dev|cloud|pro|link|top|vip|icu|live|click|mobi|ly|gl|be|tv|to|cc|edu|gov)\b(?:\/[^\s]*)?/i';
foreach ([$notes, $message] as $text) {
    if ($text !== '' && preg_match($urlPattern, $text)) {
        echo "<script>
            alert('Links and website URLs are not allowed in the message. Please go back and remove them.');
            window.history.back();
        </script>";
        exit();
    }
}

// Build the email body, skipping empty fields
$rows = [
    'Form'           => $formType,
    'Name'           => $name,
    'Phone'          => $phone,
    'Email'          => $email,
    'Company'        => $company,
    'Industry'       => $industry,
    'Service'        => $service,
    'Pickup Date'    => $date,
    'Time Slot'      => $time,
    'Address'        => $address,
    'Items / Notes'  => $notes,
    'Message'        => $message,
    'Ordered Items'  => $orderItems,
    'Page'           => $pageUrl,
];

$body = '<h3>New Lead - Laundry Today Website</h3>';
$body .= '<table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">';
foreach ($rows as $label => $value) {
    if ($value === '') continue;
    $body .= '<tr><th align="left" style="background:#f3f4f6">' . htmlspecialchars($label) . '</th><td>'
        . nl2br(htmlspecialchars($value)) . '</td></tr>';
}
$body .= '</table>';

$mail = new PHPMailer(true);

try {
    // SMTP Settings
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@cognivicdigital.com';
    $mail->Password = 'Info@987--';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    // Email Settings
    $mail->setFrom('info@cognivicdigital.com', 'Laundry Today Website');
    $mail->addAddress('LAUNDRYTODAY01@gmail.com', 'Laundry Today');
    $mail->addAddress('manishkushwahaf7@gmail.com', 'Laundry Today');
    if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($email, $name ?: $email);
    }

    $mail->isHTML(true);
    $mail->Subject = 'New Lead (' . $formType . ') - Laundry Today Website';
    $mail->Body = $body;
    $mail->AltBody = strip_tags(str_replace(['</tr>', '</th>'], ["\n", ': '], $body));

    $mail->send();
    header('Location: thank-you');
    exit();
} catch (Exception $e) {
    $error = json_encode('Sorry, your request could not be sent. Please call or WhatsApp us at +91 7702608040.');
    echo "<script>
        alert($error);
        window.history.back();
    </script>";
}
