import smtplib
import requests
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class NotificationService:
    def __init__(self):
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.email_username = os.getenv("EMAIL_USERNAME")
        self.email_password = os.getenv("EMAIL_PASSWORD")
        self.sms_api_key = os.getenv("SMS_API_KEY")
        self.sms_api_url = os.getenv("SMS_API_URL")

    async def send_order_email(self, user_email: str, order_data: dict):
        """Send order confirmation email"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.email_username
            msg['To'] = user_email
            msg['Subject'] = f"Order Confirmation - {order_data['order_number']}"

            body = f"""
            Dear Customer,

            Your order has been confirmed! Here are the details:

            Order Number: {order_data['order_number']}
            Total Amount: Rs. {order_data['total_amount']}
            Status: {order_data['status'].title()}
            Estimated Pickup Time: {order_data.get('pickup_time', 'TBD')}

            Items Ordered:
            {self._format_order_items(order_data['items'])}

            Thank you for choosing Faculty of Technology Canteen!
            University of Ruhuna

            Track your order: http://localhost:3000/orders
            """

            msg.attach(MIMEText(body, 'plain'))

            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_username, self.email_password)
            server.send_message(msg)
            server.quit()

            logger.info(f"Email sent successfully to {user_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False

    async def send_order_sms(self, phone_number: str, order_data: dict):
        """Send order confirmation SMS"""
        try:
            message = f"""
🍽️ CANTEEN ORDER CONFIRMED

Order: {order_data['order_number']}
Amount: Rs.{order_data['total_amount']}
Status: {order_data['status'].upper()}

Items: {len(order_data['items'])} items
Pickup: {order_data.get('pickup_time', 'TBD')}

Track: bit.ly/canteen-orders
Faculty of Technology Canteen
University of Ruhuna
            """.strip()

            # Using a generic SMS API structure
            payload = {
                'api_key': self.sms_api_key,
                'to': phone_number,
                'message': message,
                'from': 'CANTEEN'
            }

            if self.sms_api_url:
                response = requests.post(self.sms_api_url, json=payload)
                if response.status_code == 200:
                    logger.info(f"SMS sent successfully to {phone_number}")
                    return True

            logger.warning("SMS API not configured, skipping SMS")
            return True  # Return True to not block order processing

        except Exception as e:
            logger.error(f"Failed to send SMS: {str(e)}")
            return False

    async def send_status_update(self, user_email: str, phone_number: str, order_data: dict):
        """Send order status update notifications"""
        status_messages = {
            'confirmed': 'Your order has been confirmed and is being prepared.',
            'preparing': 'Your order is now being prepared by our chefs.',
            'ready': '🎉 Your order is ready for pickup!',
            'completed': 'Thank you! Your order has been completed.'
        }

        status = order_data['status']
        if status in status_messages:
            # Send email update
            await self._send_status_email(user_email, order_data, status_messages[status])
            
            # Send SMS update
            await self._send_status_sms(phone_number, order_data, status_messages[status])

    async def _send_status_email(self, user_email: str, order_data: dict, message: str):
        """Send status update email"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.email_username
            msg['To'] = user_email
            msg['Subject'] = f"Order Update - {order_data['order_number']}"

            body = f"""
            Dear Customer,

            {message}

            Order Number: {order_data['order_number']}
            Current Status: {order_data['status'].title()}
            
            Track your order: http://localhost:3000/orders

            Faculty of Technology Canteen
            University of Ruhuna
            """

            msg.attach(MIMEText(body, 'plain'))

            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_username, self.email_password)
            server.send_message(msg)
            server.quit()

            return True

        except Exception as e:
            logger.error(f"Failed to send status email: {str(e)}")
            return False

    async def _send_status_sms(self, phone_number: str, order_data: dict, message: str):
        """Send status update SMS"""
        try:
            sms_message = f"""
🍽️ ORDER UPDATE

{message}

Order: {order_data['order_number']}
Status: {order_data['status'].upper()}

Faculty of Technology Canteen
            """.strip()

            payload = {
                'api_key': self.sms_api_key,
                'to': phone_number,
                'message': sms_message,
                'from': 'CANTEEN'
            }

            if self.sms_api_url:
                response = requests.post(self.sms_api_url, json=payload)
                return response.status_code == 200

            return True

        except Exception as e:
            logger.error(f"Failed to send status SMS: {str(e)}")
            return False

    def _format_order_items(self, items: list) -> str:
        """Format order items for email"""
        formatted_items = []
        for item in items:
            formatted_items.append(f"- {item['name']} x{item['quantity']} = Rs.{item['total']}")
        return "\n".join(formatted_items)

# Global notification service instance
notification_service = NotificationService()