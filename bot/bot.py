from telegram import Update
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext
import json

BOT_TOKEN = "YOUR_BOT_TOKEN"
ADMIN_CHAT_ID = 123456789  # Замените на ваш ID

def handle_web_app_data(update: Update, context: CallbackContext) -> None:
    data = json.loads(update.message.web_app_data.data)
    if data["action"] == "request_price":
        item_name = data["item"]
        user = update.message.from_user
        message = f"Пользователь {user.first_name} {user.last_name} запросил цену на товар: {item_name}"
        context.bot.send_message(chat_id=ADMIN_CHAT_ID, text=message)

def add_item(update: Update, context: CallbackContext) -> None:
    if update.message.from_user.id != ADMIN_CHAT_ID:
        update.message.reply_text("У вас нет прав для выполнения этой команды.")
        return

    try:
        category, name, image = context.args
        with open("data/data.json", "r") as file:
            data = json.load(file)
        data.append({
            "category": category,
            "name": name,
            "image": image
        })
        with open("data/data.json", "w") as file:
            json.dump(data, file, indent=4)
        update.message.reply_text(f"Товар {name} добавлен в категорию {category}.")
    except ValueError:
        update.message.reply_text("Использование: /add_item <категория> <название> <фото>")

def main() -> None:
    updater = Updater(BOT_TOKEN)
    dispatcher = updater.dispatcher

    dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_web_app_data))
    dispatcher.add_handler(CommandHandler("add_item", add_item))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()