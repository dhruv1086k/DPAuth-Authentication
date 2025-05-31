export const verifyOTP = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:20px;min-height:100vh}
        .email-container{max-width:500px;margin:0 auto;background:#FFF2EB;border-radius:20px;box-shadow:0 20px 40px rgba(0,0,0,0.1);overflow:hidden}
        .header{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%);padding:15px 30px;text-align:center}
        .header h1{color:white;font-size:28px;font-weight:700}
        .header p{color:rgba(255,255,255,0.9);font-size:16px}
        .content{padding:20px 30px;text-align:center}
        .greeting{font-size:20px;color:#333;margin-bottom:10px;font-weight:600}
        .message{font-size:16px;color:#666;line-height:1.3;margin-bottom:40px}
        .otp-container{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%);border-radius:16px;padding:20px 30px;margin:20px 0}
        .otp-label{color:white;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:15px}
        .otp-code{font-size:36px;font-weight:800;color:white;letter-spacing:4px;font-family:'Courier New',monospace;text-shadow:0 2px 4px rgba(0,0,0,0.2);margin-bottom:15px}
        .otp-validity{color:rgba(255,255,255,0.9);font-size:14px;font-weight:500}
        .warning-box{background:linear-gradient(135deg,#ffeaa7 0%,#fab1a0 100%);border-radius:12px;padding:20px;margin:30px 0;border-left:4px solid #e17055}
        .warning-box p{color:#2d3436;font-size:14px;margin:0;font-weight:500}
        .footer{background:#f8f9fa;padding:10px;text-align:center;border-top:1px solid #e9ecef}
        .footer p{color:#6c757d;font-size:14px;line-height:1.5;margin-bottom:15px}
        .brand{font-weight:700;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-size:18px}
        .divider{height:2px;background:linear-gradient(90deg,transparent 0%,#e9ecef 50%,transparent 100%);margin:10px 0}
        @media (max-width:600px){
            body{padding:10px}
            .content{padding:30px 20px}
            .header{padding:30px 20px}
            .otp-code{font-size:28px;letter-spacing:4px}
            .header h1{font-size:24px}
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>DP-Auth</h1>
            <p>Secure access to your account</p>
        </div>
        <div class="content">
            <div class="greeting">Hi there! 👋</div>
            <div class="message">
                We've received a request to verify your account. Please use the One-Time Password below to complete the verification process.
            </div>
            <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">{{OTP}}</div>
                <div class="otp-validity">⏰ Valid for the next 10 minutes</div>
            </div>
            <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%); border-radius: 12px; margin: 30px 0; border-left: 4px solid #e17055;">
    <tr>
        <td style="color: #2d3436; font-size: 14px; font-weight: 500; line-height: 1.5; font-family: Arial, sans-serif;">
            <strong>Security Notice:</strong> If you didn't request this verification code, please ignore this email. Your account remains secure.
        </td>
    </tr>
</table>
        </div>
        <div class="footer">
            <div class="divider"></div>
            <p>This is an automated message. Please do not reply to this email.</p>
            <div class="brand">DPAuth</div>
        </div>
    </div>
</body>
</html>
`;

export const resetOTP = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:20px;min-height:100vh}
        .email-container{max-width:500px;margin:0 auto;background:#FFF2EB;border-radius:20px;box-shadow:0 20px 40px rgba(0,0,0,0.1);overflow:hidden}
        .header{background:linear-gradient(135deg,#ff6b6b 0%,#ee5a24 100%);padding:15px 30px;text-align:center}
        .header h1{color:white;font-size:28px;font-weight:700}
        .header p{color:rgba(255,255,255,0.9);font-size:16px}
        .content{padding:20px 30px;text-align:center}
        .greeting{font-size:20px;color:#333;margin-bottom:10px;font-weight:600}
        .message{font-size:16px;color:#666;line-height:1.3;margin-bottom:40px}
        .otp-container{background:linear-gradient(135deg,#fd79a8 0%,#e84393 100%);border-radius:16px;padding:20px 30px;margin:20px 0}
        .otp-label{color:white;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:15px}
        .otp-code{font-size:36px;font-weight:800;color:white;letter-spacing:4px;font-family:'Courier New',monospace;text-shadow:0 2px 4px rgba(0,0,0,0.2);margin-bottom:15px}
        .otp-validity{color:rgba(255,255,255,0.9);font-size:14px;font-weight:500}
        .warning-box{background:linear-gradient(135deg,#fdcb6e 0%,#e17055 100%);border-radius:12px;padding:20px;margin:30px 0;border-left:4px solid #d63031}
        .warning-box p{color:#2d3436;font-size:14px;margin:0;font-weight:500}
        .footer{background:#f8f9fa;padding:10px;text-align:center;border-top:1px solid #e9ecef}
        .footer p{color:#6c757d;font-size:14px;line-height:1.5;margin-bottom:15px}
        .brand{font-weight:700;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-size:18px}
        .divider{height:2px;background:linear-gradient(90deg,transparent 0%,#e9ecef 50%,transparent 100%);margin:10px 0}
        .icon{font-size:24px;margin-bottom:10px}
        @media (max-width:600px){
            body{padding:10px}
            .content{padding:30px 20px}
            .header{padding:30px 20px}
            .otp-code{font-size:28px;letter-spacing:4px}
            .header h1{font-size:24px}
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>DP-Auth</h1>
            <p>Password Reset Request</p>
        </div>
        <div class="content">
            <div class="greeting">Hi there! 👋</div>
            <div class="message">
                We've received a request to reset your password. Please use the One-Time Password below to complete the password reset process.
            </div>
            <div class="otp-container">
                <div class="otp-label">Your Password Reset Code</div>
                <div class="otp-code">{{OTP}}</div>
                <div class="otp-validity">⏰ Valid for the next 10 minutes</div>
            </div>
            <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%); border-radius: 12px; margin: 30px 0; border-left: 4px solid #d63031;">
                <tr>
                    <td style="color: #2d3436; font-size: 14px; font-weight: 500; line-height: 1.5; font-family: Arial, sans-serif;">
                        <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your account remains secure and no changes will be made.
                    </td>
                </tr>
            </table>
        </div>
        <div class="footer">
            <div class="divider"></div>
            <p>This is an automated message. Please do not reply to this email.</p>
            <div class="brand">DPAuth</div>
        </div>
    </div>
</body>
</html>`;
