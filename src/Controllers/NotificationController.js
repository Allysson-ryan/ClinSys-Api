import * as NotificationService from "../service/NotificationService.js";

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await NotificationService.getNotifications(userId);

    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma notificação encontrada" });
    }

    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar notificações", error: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await NotificationService.markAsRead(id, userId);

    if (!notification) {
      return res.status(404).json({ message: "Notificação não encontrada" });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao marcar notificação como lida",
      error: error.message,
    });
  }
};
